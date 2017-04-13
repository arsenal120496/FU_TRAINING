/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';


import "./main.css"
import "../resource/main.css"
import MyMap from "../Map/MyMap";
import Table from "../Table/Table";


let user = JSON.parse(localStorage.getItem('user'));
if (user === null) {
    console.log("1")
    user = {
        email: "abcd",
        name: "me"
    }
}

const PATH_BASE = 'http://localhost:8080/home/locations';
const PATH_EMAIL = 'email=';
let PARAM_EMAIL = user.email;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLoc: [],
        }

        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.logout = this.logout.bind(this);
    }

    setSearchLocation(result) {
        this.setState({
            listLoc: result.locations
        })
    }

    fetchSearchLocation() {
        console.log(`${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}`);
        fetch(`${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}`)
            .then(resp => resp.json())
            .then(result => this.setSearchLocation(result));

    }

    /*componentWillMount() {
     this.fetchSearchLocation();
     }*/

    componentDidMount() {
        user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            user = {
                email: "abcd",
                name: "me"
            };
            this.props.router.push('/sign_in');
        } else {
            PARAM_EMAIL = user.email;
        }
        var height = (window.innerHeight - 100) + "px";
        document.getElementById("con").setAttribute("style", "height:" + height);
        document.getElementById("map").setAttribute("style", "height:" + height);
        this.fetchSearchLocation();

    }
    logout(){
        // event.preventDefault();
        localStorage.setItem('user', null);
    }
    render() {
        return (
            <div className="full-height">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">GPS Tracking System</a>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <div>Welcome, <strong>{user.name}</strong> (<a href="" onClick={this.logout}>Log out</a>)</div>
                        </div>
                    </div>

                </nav>

                <div className="container col-md-12" id="con">

                    <div className="col-xs-12 col-md-7 " id="map">
                        <MyMap list={this.state.listLoc}/>
                    </div>
                    <div className="col-xs-12 col-md-5">
                        <Table list={this.state.listLoc}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;