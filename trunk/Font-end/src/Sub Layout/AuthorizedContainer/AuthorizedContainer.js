/**
 * Created by Asus on 4/12/2017.
 */
import React, {Component} from 'react';


export default class AuthorizedContainer extends Component {
    render() {
        return (
            <div className="full-height">
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}