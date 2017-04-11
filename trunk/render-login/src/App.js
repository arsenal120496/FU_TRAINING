import React, {Component} from 'react';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from "react-router";


import {
    Application,
} from "./Main Layout";

import {
    Login
} from "./Sub Layout/Login"
import {
    Register
} from "./Sub Layout/Register"
import './App.css';

import {
    Home
} from "./Sub Layout/User Home"

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Application}>
                    <IndexRoute component={Login} />
                    <Route path="register" component={Register} />
                    <Route path="home" component={Home} />
                </Route>
            </Router>
        );
    }
}

export default App;
