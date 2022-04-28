import React from 'react';
import {Navigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";

export function Login(){
    const client = useQueryClient()
    const random_str = generateRandomHex(10)

    /**
     * What's sent: secret_string is sent to database to check for later
     * Expected return:
     *  {client_id: client_id,
     *   state: state}
     */

    var formdata = new FormData();
    formdata.append("state", random_str);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow', headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    const {isLoading, isError, data, error} = useQuery(["setString"], async () => {
        console.log(random_str)
        let response = await fetch("http://localhost:8000/start_auth", requestOptions)
        return response.json()
    }, { refetchOnWindowFocus: false, retry: false })



    if(isLoading){
        return <h3>Redirecting...</h3>
    } if (isError) {
        return <div><h3>Something wrong happened.</h3> <p>{error}</p></div>
    } if (data) {
        const link = "https://todoist.com/oauth/authorize?client_id=" + data.client_id +
            "&scope=data:read_write&state=" + data.state
        // return (<Navigate to={link}/>)
        window.location.href = link;
        return null;

    } else {
        return null;
    }
}

export function Logout(){
    localStorage.removeItem("token")
    return <Navigate to="/"/>
}

const generateRandomHex = (length) => {
    const randomNumber = Math.random().toString(16);
    return randomNumber.substr(2, length);
};