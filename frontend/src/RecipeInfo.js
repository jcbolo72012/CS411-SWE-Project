import React, {Component} from "react";
import {Link, useParams, Outlet} from "react-router-dom";
import {useQuery} from "react-query";
import {Box, Stack} from "@mui/material";

export default function RecipeInfo(){
    const {recipe_id}= useParams();
    console.log(recipe_id)

    const { isLoading, isError, data, error } = useQuery(['getInfo', recipe_id], async () => {
        const response = await fetch("http://localhost:8000/information/" + recipe_id)
               return response.json()
            }, {refetchOnWindowFocus: false}
        )

    // TODO: Make loading/error pages
    if(isLoading){
        return <div><h3>Loading recipe information...</h3></div>
    } if(isError || (data && data.status && data.status === "failure")) {
        return (<div><h3>Couldn't find recipe with that ID!</h3>
                <Link to="/">Back to main page?</Link></div>)
    } if(data && data.status && data.status === "failure") {
        return (<div><h3>Couldn't find recipe with that ID!</h3>
                <Link to="/">Back to main page?</Link></div>)
    } else {
        // guaranteed to have all fields, didn't return error.
        // TODO: goal right now is to get the content on the page, formatting is very important though!
        return (<Box sx={{border: 1, mx: 10, p: 5}}>
            <h1> {data.title} </h1>
            <Stack direction="row" justifyContent="end">
                <img src={data.image} alt={data.title}/>
            </Stack>
            <Outlet/>
        </Box>)
    }

}