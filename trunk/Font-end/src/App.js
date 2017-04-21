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
    AuthorizedContainer
} from "./Sub Layout/AuthorizedContainer"

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
                    <Route component={AuthorizedContainer} onEnter={requireAuth()}>
                        <IndexRoute component={Home}/>
                        {/*<Route path="/home" component={Home}></Route>*/}
                    </Route>
                    <Route component={Login} path="/sign_in">
                    </Route>
                    <Route component={Register} path="/register">
                    </Route>
                </Route>
            </Router>

        );
    }
}

// const Routes = (
//     <Router history={history}>
//         <Route path="/" component={App}>
//             <Route component={AuthorizedContainer} onEnter={requireFake}>
//                 <IndexRoute component={Home}/>
//                 <Route component={RouteView} path='/routes-view'/>
//             </Route>
//             <Route component={LoginPage} path="/sign_in">
//             </Route>
//         </Route>
//         <Route path="*" component={NoMatch}/>
//     </Router>
// );
function requireAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        window.location = 'http://553c2224.ngrok.io/#/sign_in';
    }
}

export default App;
