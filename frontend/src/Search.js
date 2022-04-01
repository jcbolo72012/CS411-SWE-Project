import {useQuery, useQueryClient} from "react-query";
import axios from "axios";

const queryClient = new queryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus: false,
            retry: false
        }
    }

});

function Search(header_data){
    const { isLoading, isError, data, error } = useQuery("recipe_search", requestSearch(header_data));

    if(isLoading){
        return <span>Loading...</span>
    } else if (isError) {
        return <span>Error! {error.message}</span>
    }

    return (
        <div className="Search">
            <ul>
                data.map()
            </ul>
        </div>
    )
}

// Ideally header_data is a JSON object that has extra queries if needed
function requestSearch(header_data){
    axios.get("http://localhost:8080/search/")
}
