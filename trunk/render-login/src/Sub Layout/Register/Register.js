/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';


import "./main.css"
import "../resource/main.css"


class Register extends Component {

    render() {
        return (
            <div className="overlay">
                <div className="register-box">
                    <div className="popup-form-title">
                        <h1>Register</h1>
                    </div>
                    <div>
                        <form action="#" method="post">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="txtEmail"
                                    placeholder="Email"
                                    /*pattern="/^[\w+_.]{3,15}@[a-z]{3,10}[.][a-z]{3,5}(.[a-z]{2,5})?$/"*/
                                    required/>
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="txtUsername"
                                    placeholder="Username"
                                    required/>
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
                                    required/>
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
                                    required/>
                            </div>
                            <input className="btn btn-success btn-in-popup-form" id="btnRegister" type="submit"
                                   value="Register"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;