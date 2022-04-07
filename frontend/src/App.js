import './App.css';
import {Component} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {Box, Button, Input, TextField} from "@mui/material";

const client = new QueryClient();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { search: '', clippedSearch: ''}
    }

    onChange(ev) {
        this.setState({ search: ev.target.value })
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.setState({ clippedSearch: this.state.search })
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

    const {isLoading, isError, data} = useQuery('searchRecipes', async () => {
            const response = fetch("https://localhost:8000/" + props.query)
            return response.json;
        }
    )

    if(props.query.length < 3) {
        return null;
    } if(isLoading){
        return ( <h3> "Loading recipes..." </h3>)
    } if(isError){
        return ( <h3> "Oops! An error occurred! </h3>)
    } else {
        return (
            <div>
            {data.results.map ((recipe, index) => (
                <div>
                    <Box sx={{ border: 1, display: "flex", justifyContent: "space-between" }}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image}/>
                        <text>Calories: {recipe.calories} cal</text>
                    </Box>
                </div>
            ))}
            </div>
        )
    }
}

export default App;
