import React from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from "../pages/signup";


const Routes = () => (

    <Switch>
        <PrivateRoute path="/home" component={Home}/>
        <Route path="/" component={SignIn} exact  />
        <Route path="/registerForm" component={SignUp} />
    </Switch>
);

export default Routes;
