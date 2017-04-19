/**
 * Created by Asus on 3/30/2017.
 */
import React, {Component} from 'react';
import '../resource/bootstrap/css/bootstrap.min.css';
import '../resource/font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import "./main.css"
import "../resource/main.css"
import MyMap from "../Map/MyMap";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment = require('moment');
var BS = require('react-bootstrap');

let user = JSON.parse(localStorage.getItem('user'));
if (user === null) {
    // console.log("1")
    user = {
        email: "abcd",
        name: "me"
    }
}

const PATH_BASE = 'http://localhost:8080/getLocationByTime';
const PATH_EMAIL = 'email=';
let PARAM_EMAIL = user.email;
const PATH_FROMDATE = 'fromDate=';
let PARAM_FROMDATE = moment().format('MM/DD/YYYY');

const PATH_TODATE = 'toDate=';
let PARAM_TODATE = moment().format('MM/DD/YYYY');


// class use DateRangePicker
var CalendarInput = React.createClass({
    getInitialState: function () {
        return {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment(),
            endDate: moment()
        };
    },
    handleEvent: function (event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    },
    render: function () {
        var start = this.state.startDate.format('MM-DD-YYYY');
        var end = this.state.endDate.format('MM-DD-YYYY');
        var label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        return (
            <BS.Col md={10}>
                <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate}
                                 ranges={this.state.ranges} onEvent={this.handleEvent}>
                    <BS.Button className="selected-date-range-btn" style={{width: '100%'}}>
                        <div className="pull-left"><BS.Glyphicon glyph="calendar"/></div>
                        <div className="pull-right">
									<span id="dateValue">
										{label}&nbsp;&nbsp;
									</span>
                            <span className="caret"></span>
                        </div>
                    </BS.Button>
                </DateRangePicker>
            </BS.Col>
        );
    }
});

const center = {
    lat: 10.8231,
    lng: 106.6297
}

let markerList = [];
let pathList = [];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            listLoc: [],
            center: {
                lat: 10.8231,
                lng: 106.6297
            },
            paths: [],
        }

        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.logout = this.logout.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    setSearchLocation(result) {
        this.setState({
            listLoc: [],
            markers: [],
            paths: [],
            center: {
                lat: 10.8231,
                lng: 106.6297
            },
        });
        markerList = [];
        pathList = [];
        //
        const list = result;
        list.forEach(function (el) {
            const nextMarkers = {
                position: {
                    lat: parseFloat(el.location.latitude),
                    lng: parseFloat(el.location.longitude),
                },
                defaultAnimation: 2,
                key: el.time, // Add a key property for: http://fb.me/react-warning-keys
            };
            const path = {
                lat: parseFloat(el.location.latitude),
                lng: parseFloat(el.location.longitude),
            };
            center.lat = parseFloat(el.location.latitude);
            center.lng = parseFloat(el.location.longitude);
            if (markerList.length !== list.length) {
                if (markerList.indexOf(nextMarkers) < 0) {
                    markerList.push(nextMarkers);
                    pathList.push(path);
                }
            }

        });
        this.setState({
            paths: pathList,
            center: center,
            markers: markerList,
            listLoc: result.reverse(),
        });
    }

    fetchSearchLocation() {
        $.ajax({
            url: `${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}&${PATH_FROMDATE}${PARAM_FROMDATE}&${PATH_TODATE}${PARAM_TODATE}`,
            method: 'GET',
            success: function (data) {
                this.setSearchLocation(data)
            }.bind(this),
            error: function (err) {
                console.log('error: ', err);
            }
        });

    }

    componentDidMount() {
        // user = JSON.parse(localStorage.getItem('user'));
        // if (user === null) {
        //     user = {
        //         email: "abcd",
        //         name: "me"
        //     };
        //     this.props.router.push('/sign_in');
        // } else {
        //     PARAM_EMAIL = user.email;
        // }
        var height = (window.innerHeight - 100) + "px";
        document.getElementById("con").setAttribute("style", "height:" + height);
        document.getElementById("map").setAttribute("style", "height:" + height);
        // this.timerID = setInterval(
        //     () => this.fetchSearchLocation(),
        //     1000
        // );
        this.fetchSearchLocation();


    }

    handleFormSubmit() {
        var datesStr = document.getElementById('dateValue').innerText.trim();
        do {
            datesStr = datesStr.replace('-', '/');
        } while (datesStr.indexOf('-') > 0);
        var dates = datesStr.split(' ');
        if (dates.length === 1) {
            dates.push(datesStr);
        }
        PARAM_FROMDATE = dates.shift();
        PARAM_TODATE = dates.pop();
        this.fetchSearchLocation();

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    logout() {
        // event.preventDefault();
        localStorage.setItem('user', null);
        localStorage.setItem('logout', true);
    }

    render() {
        /*user = JSON.parse(localStorage.getItem('user'));
         if (user === null) {
         user = {
         email: "abcd",
         name: "me"
         };
         this.props.router.push('/sign_in');
         } else {
         PARAM_EMAIL = user.email;
         }
         */
        user = JSON.parse(localStorage.getItem('user'));
        if (user.name === "me") {
            window.location.reload(true);
        } else {
            PARAM_EMAIL = user.email;
        }
        const columns = [{
            header: 'Latitude',
            id: 'latitude',
            accessor: d => d.location.latitude
        },
            {
                header: 'Longitude',
                id: 'longitude',
                accessor: d => d.location.longitude
            },
            {
                header: 'Device',

                accessor: 'nameDeivce'
            },
            {
                header: 'Time',

                accessor: 'time'
            }
        ]

        return (
            <div className="full-height">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">GPS Tracking System</a>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <div>Welcome, <strong>{user.name}</strong> (<a href="" onClick={this.logout}>Log out</a>)
                            </div>
                        </div>
                    </div>

                </nav>
                <div className="container col-md-12" id="con">

                    <div className="col-xs-12 col-md-7 " id="map">
                        <MyMap markerList={this.state.markers} centerPoint={this.state.center}
                               pathList={this.state.paths}/>
                    </div>
                    <div className="col-xs-12 col-md-5" id="table-area">
                        <div className="col-xs-12 col-md-12" id="search-area">
                            <form action="http://localhost:8080/home/locations" method="GET" className="form-inline"
                                  id="filter-form">
                                <h5>Select day to tracking your GPS <cite>(MM-DD-YYYY)</cite>:</h5>
                                <div className="col-xs-12 col-md-12">
                                    <CalendarInput/>
                                    <button type="button" id="btnSeach" onClick={this.handleFormSubmit}
                                            className="btn btn-success">Search
                                    </button>
                                </div>

                            </form>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <ReactTable
                                data={this.state.listLoc}
                                columns={columns}
                                defaultPageSize={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;