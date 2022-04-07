import './App.css';
import {Component, useState} from "react";
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

// TODO: convert function to Component
// TODO: prevent re-rendering on every type
function Recipe(props){

    const client = useQueryClient()
    const [query, setQuery] = useState();

    const { isLoading, isError, data, error } = useQuery(['searchRecipes', props.query], async () => {
        setQuery(props.query)
        const response = await fetch("http://localhost:8000/search/" + query)
               if (!response.ok) {
                   throw new Error('Network response was not ok')
               }
               return response.json()
            }
        )

    if (query && query.length < 3){
        return null;
    }

    console.log(data)

    if(isLoading) {
        return <div><h3>Loading...</h3></div>
    } if (isError) {
        return <div><h3>Error! {error}</h3></div>
    } if(data && data.results) {
        console.log(data)
        return(
            <div>
            {data.results.map ((recipe, index) => (
                <div>
                    <Box sx={{ border: 1, display: "flex", mx:"auto"}}>
                        <h2>{recipe.title}</h2><br/>
                        Recipe ID: {recipe.id}<br/>
                        <img src={recipe.image}/>
                    </Box>
                </div>
            ))}
            </div>)
    }
}

export default App;
