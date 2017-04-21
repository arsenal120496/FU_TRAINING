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

import {NavDropdown, MenuItem, Modal, Button} from 'react-bootstrap'


var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment = require('moment');
var BS = require('react-bootstrap');
// Import Notyf using CommonJS require
var Notyf = require('notyf');
import 'notyf/dist/notyf.min.css';

// Create an instance of Notyf
var notyf = new Notyf()

// Display an alert notification


let user = JSON.parse(localStorage.getItem('user'));
if (user === null) {
    // console.log("1")
    user = {
        email: "abcd",
        name: "me",
        tokenValue: "asdsad"
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

const marker = {
    position: {
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng),
    },
    defaultAnimation: 2,
    key: PARAM_TODATE,
};
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
            show: false,
        }

        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.logout = this.logout.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showPass = this.showPass.bind(this);
        this.hidePass = this.hidePass.bind(this);
    }

    showPass(id) {
        $(id).attr('type', 'text');
    }

    hidePass(id) {
        $(id).attr('type', 'password');
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        notyf.confirm('Please fill out the form');
        this.setState({show: false});
    }

    setSearchLocation(result) {
        //reset marker, path, center
        this.setState({
            listLoc: [],
            markers: [],
            paths: [],
            center: {
                lat: 10.8231,
                lng: 106.6297
            },
        });
        pathList = [];
        //update marker, path, center
        const list = result;
        list.forEach(function (el) {
            const path = {
                lat: parseFloat(el.location.latitude),
                lng: parseFloat(el.location.longitude),
            };
            marker.position.lat = parseFloat(el.location.latitude);
            marker.position.lng = parseFloat(el.location.longitude);
            marker.key = el.time;
            center.lat = parseFloat(el.location.latitude);
            center.lng = parseFloat(el.location.longitude);
            pathList.push(path);
        });
        this.setState({
            paths: pathList,
            center: center,
            markers: marker,
            listLoc: result.reverse(),
        });
        //reset marker if no data
        if (result.length === 0) {
            this.setState({
                markers: {}
            })
        }

    }

    fetchSearchLocation() {
        // $.ajaxSetup({
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader("Authorization", user.tokenValue + "");
        //         console.log(xhr);
        //     }
        // });
        function setTokenHeader() {
            return {"Authorization": user.tokenValue};
        }

        $.ajax({
            url: `${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}&${PATH_FROMDATE}${PARAM_FROMDATE}&${PATH_TODATE}${PARAM_TODATE}`,
            method: 'GET',
            headers: setTokenHeader(),
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
        //fix hover background with null row
        var listRow = document.getElementsByClassName('rt-tr-group');
        for (var i = 0; i < listRow.length; i++) {
            if (listRow[i].innerText.trim() === '') {
                listRow[i].setAttribute('style', 'background-color: #fff');
            }
        }
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
        // localStorage.setItem('logout', true);
        window.location.reload();
    }

    render() {
        if (user.name === "me") {
            window.location.reload(true);
        } else {
            PARAM_EMAIL = user.email;
        }
        const columns = [
            {
                header: 'Latitude',
                id: 'latitude',
                accessor: d => d.location.latitude,
                sortable: false,
                hideFilter: true,
            },
            {
                header: 'Longitude',
                id: 'longitude',
                accessor: d => d.location.longitude,
                hideFilter: true,
                sortable: false
            },
            {
                header: 'Device',
                accessor: 'nameDevice',
                sortable: false,
                hideFilter: false,
            },
            {
                header: 'Time',
                accessor: 'time',
                sortable: false,
                hideFilter: false,
            }
        ]
        const name = "Welcome, " + user.name;
        return (
            <div className="full-height">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">GPS Tracking System</a>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <NavDropdown title={name} id="nav-dropdown">
                                <MenuItem onClick={this.showModal}>
                                    <span className="glyphicon glyphicon-user"/>&nbsp;
                                    Thong tin tai khoan
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem onClick={this.logout}>
                                    <span className="glyphicon glyphicon-log-out"/>&nbsp;
                                    Dang xuat
                                </MenuItem>
                            </NavDropdown>
                        </div>
                    </div>
                    <Modal
                        /*{...this.props}*/
                        show={this.state.show}
                        onHide={this.hideModal}
                        dialogClassName="custom-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">Thong tin tai khoan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/*email*/}
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
                                    onChange={(event) => this._handleChange(event, 'email')}
                                    value={user.email}
                                    disabled
                                />
                            </div>
                            {/*name*/}
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
                                    onChange={(event) => this._handleChange(event, 'name')}
                                    value={user.name}
                                />
                            </div>
                            {/*password*/}
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
                                    // value={user.password}
                                />
                            </div>
                            {/*confirm*/}
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
                                    onChange={(event) => this._handleChange(event, 'confirmPassword')}
                                    // value={user.password}
                                    id="confirm-password"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.hideModal}>Save</Button>
                            <Button onClick={this.hideModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
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
                                pageSizeOptions={[5, 10]}
                                showFilters={true}
                                getTdProps={(state, rowInfo, column, instance) => {
                                    return {
                                        onClick: e => {
                                            if (rowInfo !== undefined) {
                                                this.setState({
                                                    center: {
                                                        lat: parseFloat(rowInfo.rowValues.latitude),
                                                        lng: parseFloat(rowInfo.rowValues.longitude),
                                                    }, markers: {
                                                        position: {
                                                            lat: parseFloat(rowInfo.rowValues.latitude),
                                                            lng: parseFloat(rowInfo.rowValues.longitude),
                                                        },
                                                        defaultAnimation: 2,
                                                        key: rowInfo.rowValues.time,
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;