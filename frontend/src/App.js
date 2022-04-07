import './App.css';
import {Component, useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {Box, Button, TextField} from "@mui/material";

class App extends Component {

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
                  <Box sx={{border: 1 }} autocomplete="off">
                          <TextField id="outlined-basic" name="query" label="Search for Recipes..." variant="outlined"
                                     value={this.state.query} onChange={this.onChange}/>
                          <Button variant="contained" type="submit">Search</Button>
                  </Box>
              </form>
              <Recipe query={this.state.clippedSearch}/>
          </div>
        );
    }
}

function Recipe(props){

    const client = useQueryClient()
    const [message, setMessage] = useState();
    const { isLoading, isError, data, error } = useQuery('searchRecipes', async () => {
        const response = await fetch("http://localhost:8000/search/" + props.query)
               if (!response.ok) {
                   throw new Error('Network response was not ok')
               }
               return response.json()
            }
        )

    useEffect(() => {

        if(props.query.length < 3) {
            setMessage(null);
        } if(data && data.results) {
            console.log(data)
            setMessage(
                <div>
                {data.results.map ((recipe, index) => (
                    <div>
                        <Box sx={{ border: 1, display: "flex", justifyContent: "space-between", mx:"auto"}}>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image}/>
                            <text>Calories: {recipe.calories} cal</text>
                        </Box>
                    </div>
                ))}
                </div>)
        }
    }, [props.query, data])

    if(isLoading) {
        return <div><h3>Loading...</h3></div>
    } if (isError) {
        return <div><h3>Error! {error}</h3></div>
    } return (
        <div> {message} </div>);
}

export default App;
