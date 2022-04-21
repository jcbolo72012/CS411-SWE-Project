import {Component} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

export default function RecipeInfo(){
    let params = useParams();

    const { isLoading, isError, data, error } = useQuery(['getInfo', id], async () => {
        const response = await fetch("http://localhost:8000/information/" + id)
               if (!response.ok) {
                   return null
               }
               return response.json()
            }, {refetchOnWindowFocus: false}
        )

    // TODO: Make loading/error pages
    if(isLoading){
        return null
    } if(isError) {
        return null
    } if(data && !data.extendedIngredients){
        return null
    }

    return (



    )

}