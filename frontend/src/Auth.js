import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

export default function Auth(){

    const {code, state} = useParams();


    /**
     * Request: "localhost:8000/authorize" with code, secret string to verify
     * - secret_string was made during the initial callback and login request:
     *      - the backend should match that secret_string that was sent
     * - state is what is returned from the query.
     *
     * What should happen:
     * - Match the secret_string with the initial callback from step 1
     * - If the above works, request OAuth from Todoist
     * - If the above works, store code in database and send code back to frontend :).
     *
     * Expected response:
     * - Failure (either code is not valid, or secret_string didn't match. (return 500 Unauthorized)
     * - Success (return 200, with a success
     */
    const { isLoading, isError, data, error } = useQuery(['authorize', code] = async () => {
         const response = await fetch("http://localhost:8000/authorize/", {
             method: "POST",
             body: JSON.stringify({
                 code: code,
                 state: state
             })
         })
     })

    if(isLoading){
        return (<h3>Authorizing...</h3>)
    } else if (isError) {
        return (<h3>Error! {error}</h3>)
    } else {
        localStorage.setItem("token", data.access_code)
        return (<h3>Successfully authorized! You're now logged in!</h3>)
    }




}