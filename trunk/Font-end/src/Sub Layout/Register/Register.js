/**
 * Created by Asus on 3/30/2017.
 */
import React, { Component } from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import "./main.css"
import "../resource/main.css"

import {Error, Success} from '../Notify'



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
    }
    validateInput(){
        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "Password and Confirm Password is not correct"});
            console.log(this.state.error);
            return false;           
        }
        else if(this.state.password.length < 6){
            this.setState({error: "The length of password must be 8 character at least"});
            console.log(this.state.error);
            return false; 
        }
        else{
            this.setState({error: false});
            return true;
        }
    }

    fetchRegister(event) {
        event.preventDefault();
        let valid = this.validateInput();
        console.log('valid: ', valid);
        if(valid){
            console.log('fetched: ', this.state);
            $.ajax({
            url: 'http://localhost:8080/register',
            method: 'POST',
            // headers: { "Access-Control-Allow-Origin": "*" },
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password                          
            },
            success: function (data) {
                console.log(data);
                this.setState({success: 'success'});
                console.log(this.state);
            }.bind(this),
            error: function (err){
                this.setState({error: 'Email existed. Please try another'});              
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
                        {this.state.error ? <Error error={this.state.error}></Error> : null}
                        {this.state.success ? <Success/>: null}                     
                    <div>
                        <form onSubmit={(event) => this.fetchRegister(event)}>
                             <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="txtEmail"
                                    placeholder="Email"
                                    required
                                    onChange={(event) => this._handleChange(event, 'email')} />
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="txtUsername"
                                    placeholder="Name"
                                    required
                                    onChange={(event) => this._handleChange(event, 'name')} />
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="txtPassword"
                                    placeholder="Password"
                                    required
                                    onChange={(event) => this._handleChange(event, 'password')} />
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"></i>
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
                                value="Register" />
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;