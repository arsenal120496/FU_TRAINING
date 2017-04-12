import React, {Component} from 'react';

class Error extends Component {
    render(){
        const {error} = this.props;
        return(
            <div className="alert alert-danger">
                <p>{error}</p>
            </div>
        );
    }
}
export default Error;