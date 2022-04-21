import './App.css';
import React, {Component, useState} from "react";
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "react-query";
import {Box, Button, Link, TextField} from "@mui/material";
import {Outlet} from "react-router-dom";
import {ReactQueryDevtools} from "react-query/devtools";

/**
 * App - The default page, where users can search for a recipe
 * Once the user generates a query, the Recipe function will regenerate the queries, if used.
 */

class App extends Component{
    render() {
        return (
            <Searcher />
        );
    }
}

class Searcher extends Component {

    constructor(props) {
        super(props);
        this.state = {query: '', clippedSearch: ''}
    }

    onChange = (ev) => {
        this.setState({ query: ev.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ clippedSearch: this.state.query })
    }

    render(){
        return (
          <div class="App">
              <form onSubmit={this.onSubmit}>
                  <Box sx={{border: 1, mx: 10, p: 5}} autocomplete="off">
                          <TextField id="outlined-basic" sx={{ input: {color: 'white'}}}
                                     InputLabelProps={{ style: {color: 'white'}}}
                                     name="query" label="Search for Recipes..." variant="outlined"
                                     value={this.state.query} onChange={this.onChange}/>
                          <Button variant="contained" type="submit">Search</Button>
                  </Box>
              </form>
              <ReactQueryDevtools initialIsOpen={false} />
              <Recipe query={this.state.clippedSearch}/>
              <Outlet/>
          </div>
        );
    }
}

/**
 * Recipe
 * @param query -- The recipe to search for
 * @returns {JSX.Element|null} -- either a list of matched recipe ideas,  or no recipes (no results found)
 * @constructor
 */

function Recipe({query}){

    const client = useQueryClient()

    const { isLoading, isError, data, error } = useQuery(['searchRecipes', query], async () => {
        const response = await fetch("http://localhost:8000/search/" + query.replace(/ /g, '_'))
               if (!response.ok) {
                   return {};
               }
               return response.json()
            }, {refetchOnWindowFocus: false}
        )

    if (query && query.length < 3){
        return null;
    }

    // console.log(query)
    // console.log(data)

    if(isLoading) {
        return <div><h3>Loading...</h3></div>
    } if (isError) {
        return <div><h3>Error! {error}</h3></div>
    } if(data && data.results) {
        return(
            <div>
            {data.results.map ((recipe, index) => (
                <div key={index}>
                    <Box sx={{ border: 1, display: "flex", mx: 10, p: 1}}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image}/>
                        <Link component="button" to={"/recipe/" + recipe.id}>Go to Recipe</Link>
                    </Box>
                </div>
            ))}
            </div>)
    }
}

export default App;
