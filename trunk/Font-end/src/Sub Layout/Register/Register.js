/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import "./main.css"
import "../resource/main.css"
import {Link} from 'react-router';
import {Error, Success} from '../Notify'
// Import Notyf using CommonJS require
var Notyf = require('notyf');
import 'notyf/dist/notyf.min.css';

// Create an instance of Notyf
var notyf = new Notyf({
    delay: 5000,
});


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            success: false,
            confirmPassword: '',
            error: false
        }
        this._handleChange = this._handleChange.bind(this);
        this.fetchRegister = this.fetchRegister.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm() {
        let reset = document.getElementsByClassName('form-control');
        for (var i = 0; i < reset.length; i++) {
            reset[i].value = "";

        }
    }

    validateInput() {
        // var pattern = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/";
        if (this.state.password.trim().match(/^[0-9a-zA-Z@]{6,}$/)) {
            console.log("ok");
        } else {
            console.log("fail");
        }
        if (!this.state.name.trim().match(/^[a-zA-Z0-9_]{2,30}$/)) {
            notyf.alert("Username can't contain special character except '_' character");
            return false;
        }
        if (this.state.password.trim() !== this.state.confirmPassword.trim()) {
            notyf.alert("Password and Confirm Password is not match");
            return false;
        }
        else if (!this.state.password.trim().match(/^[0-9a-zA-Z@]{6,}$/)) {
            notyf.alert("The length of password must be 6 character at least and not contain special character");
            return false;
        }
        else {
            this.setState({error: false});
            return true;
        }
    }

    fetchRegister(event) {
        event.preventDefault();
        let valid = this.validateInput();
        // console.log('valid: ', valid);
        if (valid) {
            console.log('fetched: ', this.state);
            $.ajax({
                url: 'http://5645304f.ngrok.io/register',
                method: 'POST',
                // headers: { "Access-Control-Allow-Origin": "*" },
                data: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                },
                success: function (data) {
                    // console.log(data);
                    this.setState({success: 'success'});
                    // console.log(this.state);
                    this.resetForm();
                }.bind(this),
                error: function (err) {
                    this.setState({
                        error: 'Email existed. Please try another',
                        success: false
                    });
                }.bind(this)
            });
        }
    }

    _handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    render() {

        return (
            <div className="overlay">
                <div className="register-box">
                    <div className="popup-form-title">
                        <h1>Register</h1>
                    </div>
                    {this.state.error ? <Error error={this.state.error}/> : null}
                    {this.state.success ? <Success/> : null}
                    <div>
                        <form onSubmit={(event) => this.fetchRegister(event)}>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope" aria-hidden="true"/>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="txtEmail"
                                    placeholder="Email"
                                    required
                                    onChange={(event) => this._handleChange(event, 'email')}/>
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-user" aria-hidden="true"/>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="txtUsername"
                                    placeholder="Name"
                                    required
                                    onChange={(event) => this._handleChange(event, 'name')}/>
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="txtPassword"
                                    placeholder="Password"
                                    required
                                    onChange={(event) => this._handleChange(event, 'password')}
                                />
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="txtConfirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    onChange={(event) => this._handleChange(event, 'confirmPassword')}/>
                            </div>
                            <div className="input-group">
                                <input className="btn btn-success btn-block" id="btnRegister" type="submit"
                                       value="Register"/>
                            </div>
                            <div id="login-link" className="text-center"><Link to='/sign_in'>Login with existed account</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;