import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from '../pages/HomePage';
import UserProfile from '../pages/UserProfile';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={HomePage}/>
                <Route exact path="/user" component={UserProfile}/>
            </Routes>
        </BrowserRouter> 
     );
}

export default Router;