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

const client=new QueryClient();

ReactDOM.render(
    <div className="App">
        <React.StrictMode>
        <QueryClientProvider client={client}>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar/>}>
                  <Route path="/" element={<App/>}/>
                  <Route path="/recipe/:recipe_id" element={<RecipeInfo/>}/>
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
            {/* Your navbar component */}
            <MenuBar />

            {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
            <Outlet />

            {/* You can add a footer to get fancy in here :) */}
          </>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
