/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';


import "./main.css"
import "../resource/main.css"

import $ from "jquery"

import {Error} from '../Notify'
import {Link} from 'react-router';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://525d70fa.ngrok.io/login',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            success: function (data) {
                if (data !== null) {
                    localStorage.setItem("user", JSON.stringify(data));
                    this.props.router.push('/');
                }
                else {
                    this.setState({error: 'Invalid email or password.'});
                }
            }.bind(this),
            error: function (err) {
                this.setState({error: 'Invalid email or password.'});
            }.bind(this)
        });
    }


    handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }


    render() {
        return (
            <div className="overlay">
                <div className="login-box">
                    <div className="popup-form-title">
                        <h1>Login</h1>
                    </div>
                    {this.state.error ? <Error error={this.state.error}/> : null}
                    <div>
                        <form id="login-form" onSubmit={(evt) => this.handleSubmit(evt)}>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope" aria-hidden="true"/>
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
                                    <i className="fa fa-key" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    required id="password"
                                    onChange={(event) => this.handleChange(event, 'password')}/>
                            </div>
                            <div className="input-group">
                                <div id="register-link"><Link to='/register'>Register new account</Link></div>
                                <input className="btn btn-success btn-block" type="submit" ref="submit" id="btnlogin"
                                       value="Login"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
;

export
default
Login;