/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';


import "./main.css"
import "../resource/main.css"

import $ from "jquery"


import {Link} from 'react-router';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.email, " - ", this.state.password);
        $.ajax({
            url: 'http://localhost:8080/login',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            success: function (data) {
                if (data !== null) {
                    this.login(data);
                } else {
                    alert("Login failed");
                }
            }.bind(this)
        });

    }


    handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    login(data) {
        var user = JSON.stringify(data);
        localStorage.setItem("user", user);
        this.props.router.push('/home');
    }

    render() {
        return (
            <div className="overlay">
                <div className="login-box">
                    <div className="popup-form-title">
                        <h1>Login</h1>
                    </div>
                    <div>
                        <form id="login-form" onSubmit={(evt) => this.handleSubmit(evt)}>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    required id="email"
                                    onChange={(event) => this.handleChange(event, 'email')}/>
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    required id="password"
                                    onChange={(event) => this.handleChange(event, 'password')}/>
                            </div>
                            <div id="register-link"><Link to='/register'>Register new account</Link></div>
                            <input className="btn btn-success btn-in-popup-form" type="submit" ref="submit"
                                   value="Login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
;

export default Login;