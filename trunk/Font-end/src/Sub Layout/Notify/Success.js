import React, {Component} from 'react';
import {Link} from 'react-router';

class Success extends Component {
    render(){
        return(
            <div className="alert alert-success">
                <p>Register successfully. Please click here to <Link to='/sign_in'><strong>Login</strong></Link></p>
            </div>
        );
    }
}
export default Success;