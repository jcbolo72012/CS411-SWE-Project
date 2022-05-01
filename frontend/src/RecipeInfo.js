import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Box, Button, Grid, Popover} from "@mui/material";
import parse from 'html-react-parser';
import {isAuth} from "./index";
import {Form, Formik, Field} from "formik";

export default function RecipeInfo(){
    const {recipe_id}= useParams();
    // console.log(recipe_id)
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoading, isError, data, error } = useQuery(['getInfo', recipe_id], async () => {
        const response = await fetch("http://localhost:8000/information/" + recipe_id)
               return response.json()
            }, {refetchOnWindowFocus: false}
        )

    console.log(data)

    if(isLoading){
        return <div><h3>Loading recipe information...</h3></div>
    } if(isError || (data && data.status && data.status === "failure")) {
        return (<div><h3>Couldn't find recipe with that ID!</h3>
                <Link to="/">Back to main page?</Link></div>)
    } if(data) {
        const instructions = data.analyzedInstructions[0];
        return (<Box sx={{mx: 10, px: 5}}>
            <h1> {data.title} </h1>
            <Grid container spacing={2} sx={{mx: 'auto'}} >
                <Grid item xs={8} sm={4} sx={{mx: 'auto', textAlign: "left", fontSize: 'large'}}>
                    {parse(data.summary)}<br/>
                    <h4>Ready in {data.readyInMinutes} minutes</h4>
                    <h5>Serves {data.servings} people</h5>
                </Grid>
                <Grid item sx={{mx: 'auto'}} xs={4} sm={6}>
                    <Grid container direction="row-reverse">
                        <img style={{width:"auto",  height:"auto"}} src={data.image} alt={data.title}/>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{textAlign: "left"}}>
                    <h3>Ingredients</h3>
                    <ul>
                    {data.extendedIngredients.map((ingredient, index) => (
                        <li>{ingredient.original}</li>
                        ))}
                    </ul>
                    {isAuth() ?
                        <div>
                            <Button variant="contained" onClick={() => setMenuOpen(true)}>Add to list</Button>
                            <Popover id={recipe_id} open={menuOpen}
                            anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
                                <RecipeForm ingredients={data.extendedIngredients}/>
                            </Popover>
                        </div> :
                        <h6>You need to be logged in to add ingredients to your to-do list.</h6>}
                </Grid>
            </Grid>
        </Box>)
    } else {
        return null;
    }
}

function Instructions({instructions}){
    if (instructions === []){
        return (
            <Grid>
                <h6>No instructions available!</h6>
            </Grid>
        )
    }
    return (
    <Grid item xs={6} sx={{textAlign: "left"}}>
        <h3>Instructions</h3>
        {instructions.map((step, index) => (
            <div>
                <h3>Step {step.number}</h3>
                <p>{step.step}</p><br/>
            </div>
        ))}
    </Grid>)
}

function RecipeForm({ingredients, recipe_name, id}){

    const [success, setSuccess] = useState(false);
    if (success) {
       return (
           <div>
               <h3>Task successfully added!</h3>
           </div>
       )
    }
    return (
        <div>
            <Formik initialValues={{
                all_ingredients: false,
                ingredients: []
            }} onSubmit={ async (values) =>{
                if(!values.get("all_ingredients")){
                    ingredients = values.get("ingredients")
                }
                const response = await fetch("http://localhost:8000/add_ingredients/",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            token: localStorage.getItem("token"),
                            ingredients: ingredients,
                            recipe_name: recipe_name,
                            url: "http://localhost:3000/recipe/" + id})
                    })
                if(response.status === 200){
                    setSuccess(true)
                }}}>
                <Form>
                    <label>
                        <Field type="checkbox" name="all_ingredients">
                            Select all
                        </Field>
                    </label><br/>
                    {ingredients.map((ingredient) => (
                        <div>
                            <label>
                                <Field type="checkbox" name="ingredients" value={ingredient.name}/>
                                {ingredient.name[0].toUpperCase() + ingredient.name.substring(1)}
                            </label><br/>
                        </div>
                    ))}
                    <label>
                        <Button color="primary" variant="contained" type="submit">
                            Add Ingredients
                        </Button>
                    </label>
                </Form>
            </Formik>
        </div>
    )
}