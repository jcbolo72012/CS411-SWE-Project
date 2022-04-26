import React from 'react';
import {Redirect} from "react-router-dom";
import {useQuery} from "react-query";

export function Login(){

    const random_str = generateRandomHex(10)

    /**
     * What's sent: secret_string is sent to database to check for later
     * Expected return:
     *  {client_id: client_id,
     *   state: state}
     */
    const {isLoading, data, error} = useQuery(["setString"], async () => {
        fetch("http://localhost:8000/start_auth/", {
            method: "POST",
            body: JSON.stringify({
                state: random_str
            })
        })
    })

    const link = "https://todoist.com/oauth/authorize?client_id=" + data.client_id + "&scope=data:read_write&state=" + random_str

    if(isLoading){
        return <h3>Redirecting...</h3>
    } else if (error) {
        return <div><h3>Something wrong happened.</h3> <p>{error}</p></div>
    } else {
        return (
            <Redirect to={link}/>
        )
    }
}

export function Logout(){
    localStorage.removeItem("token")
    return <Redirect to="/"/>
}


const generateRandomHex = (length) => {
    const randomNumber = Math.random().toString(16);
    return randomNumber.substr(2, length);
};