/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';


export default class Application extends Component {
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