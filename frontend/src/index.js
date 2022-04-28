import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider, useQueryClient} from "react-query";
import {
  BrowserRouter,
  Routes,
  Route,
    Link,
    Outlet,
} from "react-router-dom";
import RecipeInfo from "./RecipeInfo";
import MenuBar from "./MenuBar";
import Auth from "./Auth";
import {Login, Logout} from "./Login";

const client=new QueryClient();

ReactDOM.render(
    <div className="App">
        <React.StrictMode>
        <QueryClientProvider client={client}>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar/>}>
                  <Route path="/" element={<App/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/logout" element={<Logout/>}/>

                  <Route path="/auth" element={<Auth/>}/>
                  <Route path="/recipe/:recipe_id/&:secret_string" element={<RecipeInfo/>}/>
                  <Route path="*" element={
                    <main style={{ padding: "1rem" }}>
                      <h3>Whoops! Page not found!</h3>
                        <Link to="/">Back to main page?</Link>
                    </main>
                  }/>
              </Route>
            </Routes>
            </BrowserRouter>
        </QueryClientProvider>
        </React.StrictMode>
    </div>,
  document.getElementById('root')
);

function Navbar(){
    return (
          <>
            <MenuBar />
            <Outlet />
          </>
    );
}

export function isAuth(){
    if("token" in localStorage){
        localStorage.getItem("token")
        return true;
    }
    return false;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
