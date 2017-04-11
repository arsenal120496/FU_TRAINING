/**
 * Created by Asus on 3/30/2017.
 */
import React, { Component } from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import {Link} from 'react-router';
import "./main.css"
import "../resource/main.css"
const PATH_BASE = 'http://localhost:8080/register';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            stated: '',
            confirmPassword: '',
            error: false
        }
        this._handleChange = this._handleChange.bind(this);
        this.fetchRegister = this.fetchRegister.bind(this);
        this.successfully = this.successfully.bind(this);
        this.renderSuccessfull = this.renderSuccessfull.bind(this);
    }
    validateInput(){
        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "Password and Confirm Password is not correct"});
            return false;
        }
        else{
            this.setState({error: false});
            return true;
        }
    }
    successfully(){
        this.setState({stated: 'success'});
    }
    renderSuccessfull(){
        if (!this.state.stated === 'success') {
      return (
        <div className="alert alert-success">
          <p>Register successfully. Please click here to <Link to='/login'><strong>Login</strong></Link></p>
        </div>
      );
    }
}
    renderError(){
        if(this.state.error){
            <div className="alert alert-success">
          <p>{this.state.error}</p>
        </div>
        }
    }
    fetchRegister(event) {
        event.preventDefault();
        
        if(this.validateInput()){
            console.log('fetched: ', this.state);
            $.ajax({
            url: 'http://localhost:8080/register',
            method: 'POST',
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password                          
            },
            success: function (data) {
                this.successfully();
                console.log(this.state);
            }.bind(this)
        });
        }
    }
    _handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
        console.log(this.state);
    }
    render() {
        const message = this.renderError();
        return (
            <div className="overlay">
                <div className="register-box">
                    <div className="popup-form-title">
                        <h1>Register</h1>
                    </div>
                        {message}
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
                                    /*pattern="/^[\w+_.]{3,15}@[a-z]{3,10}[.][a-z]{3,5}(.[a-z]{2,5})?$/"*/
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
                            <input className="btn btn-success btn-in-popup-form" id="btnRegister" type="submit"
                                value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;