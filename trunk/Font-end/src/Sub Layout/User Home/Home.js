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
var moment = require('moment-timezone');
var BS = require('react-bootstrap');
// Import Notyf using CommonJS require
var Notyf = require('notyf');
import 'notyf/dist/notyf.min.css';

// Create an instance of Notyf
var notyf = new Notyf({
    delay: 3000,
});


let user = JSON.parse(localStorage.getItem('user'));
if (user === null) {
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
let PARAM_FROMDATE = moment().format('MM/DD/YYYY 00:00:00');
const PATH_TODATE = 'toDate=';
let PARAM_TODATE = moment().format('MM/DD/YYYY 23:59:59');
const PATH_PAGE = 'pageID=';
let PARAM_PAGE = 1;

let viewStatus = true;


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

let markers = [];
let pathList = [];
var oldCenter = {};

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
            name: user.name,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }

        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.logout = this.logout.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
        this.validateInput = this.validateInput.bind(this);

    }

    _handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    setSearchLocation(result) {
        //reset marker, path, center
        pathList = [];
        markers = [];
        //update marker, path, center
        if (result === "Not found") {
            this.setState({
                listLoc: [],
                markers: [],
                paths: [],
                center: {
                    lat: 10.8231,
                    lng: 106.6297
                },
            });
        } else {
            result.reverse().forEach(function (el) {

                var newDate = new Date(el.time);

                el.time = moment(newDate).tz("Etc/UCT").format('LLL');

                const path = {
                    lat: parseFloat(el.location.latitude),
                    lng: parseFloat(el.location.longitude),
                };
                if ((result.indexOf(el) === 0) || (result.indexOf(el) === (result.length - 1))) {
                    const nextMarkers = {
                        position: {
                            lat: parseFloat(el.location.latitude),
                            lng: parseFloat(el.location.longitude)
                        },
                        defaultAnimation: 2,
                        key: el.time, // Add a key property for: http://fb.me/react-warning-keys
                    };
                    markers.push(nextMarkers);
                }

                center.lat = parseFloat(el.location.latitude);
                center.lng = parseFloat(el.location.longitude);
                pathList.push(path);
            });

            if (viewStatus) {
                if ((center.lat !== oldCenter.lat || center.lng !== oldCenter.lng) || this.state.markers.length === 0) {

                    this.setState({
                        listLoc: [],
                        markers: [],
                        paths: [],
                        center: {
                            lat: 10.8231,
                            lng: 106.6297
                        },
                    });
                    this.setState({
                        paths: pathList,
                        center: center,
                        markers: markers,
                        listLoc: result.reverse(),
                    });
                    oldCenter = {
                        lat: center.lat,
                        lng: center.lng,
                    };
                } else {

                    this.setState({
                        listLoc: [],
                        paths: [],
                    });
                    this.setState({
                        paths: pathList,
                        listLoc: result.reverse(),
                    });
                }

            } else {
                // if (this.state.listLoc.length === 0) {
                if ((center.lat !== oldCenter.lat || center.lng !== oldCenter.lng) || this.state.markers.length === 0) {

                    this.setState({
                        listLoc: [],
                        markers: [],
                        paths: [],
                        center: {
                            lat: 10.8231,
                            lng: 106.6297
                        },
                    });
                    this.setState({
                        paths: pathList,
                        center: center,
                        markers: markers,
                        listLoc: result.reverse(),
                    });
                    oldCenter = {
                        lat: center.lat,
                        lng: center.lng,
                    };
                }
                // }

            }
            //reset marker if no data
            if (result.length === 0) {
                this.setState({
                    markers: []
                })
            }
        }
    }

    fetchSearchLocation() {
        function setTokenHeader() {
            return {"Authorization": user.tokenValue};
        }

        var pageNumTag = document.getElementsByClassName('-pageJump');
        var pageNum = pageNumTag[0].firstElementChild.value;
        if (pageNum === 0) {
            PARAM_PAGE = pageNum + 1;
        }
        $.ajax({
            url: `${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}&${PATH_FROMDATE}${PARAM_FROMDATE}&${PATH_TODATE}${PARAM_TODATE}&${PATH_PAGE}${PARAM_PAGE}`,
            method: 'GET',
            headers: setTokenHeader(),
            success: function (data) {
                this.setSearchLocation(data);
            }.bind(this),
            error: function (err) {
            }
        });

    }

    componentDidMount() {
        var height = (window.innerHeight - 52.5) + "px";
        document.getElementById("con").setAttribute("style", "height:" + height);
        document.getElementById("map").setAttribute("style", "height:" + (window.innerHeight - 100) + "px");
        document.getElementById("table-area").setAttribute("style", "height:" + (window.innerHeight - 72) + "px");
        this.fetchSearchLocation();
        var nextBtn = document.getElementsByClassName('-next');
        nextBtn[0].addEventListener("click", function (event) {
            var pageNumTag = document.getElementsByClassName('-pageJump');
            var pageNum = pageNumTag[0].firstElementChild.value;
            PARAM_PAGE = parseInt(pageNum) + 1;
            viewStatus = false;
            this.fetchSearchLocation();
        }.bind(this));
        var prevBtn = document.getElementsByClassName('-previous');
        prevBtn[0].addEventListener("click", function (event) {
            var pageNumTag = document.getElementsByClassName('-pageJump');
            var pageNum = pageNumTag[0].firstElementChild.value;
            PARAM_PAGE = parseInt(pageNum) - 1;
            viewStatus = false;
            this.fetchSearchLocation();
        }.bind(this));

        //fix hover background with null row
        var listRow = document.getElementsByClassName('rt-tr-group');
        for (var i = 0; i < listRow.length; i++) {
            if (listRow[i].innerText.trim() === '') {
                listRow[i].setAttribute('style', 'background-color: #fff');
            }
        }
        this.timerID = setInterval(
            () => this.fetchSearchLocation(),
            3000
        );
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
        PARAM_FROMDATE = dates.shift() + " 00:00:00";
        PARAM_TODATE = dates.pop() + " 23:59:59";
        viewStatus = false;
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

    handleSubmitProfile() {
        let valid = this.validateInput();
        if (valid) {
            $.ajax({
                url: 'http://localhost:8080/updateProfile',
                method: 'POST',
                headers: {"Authorization": user.tokenValue},
                data: {
                    name: this.state.name,
                    email: user.email,
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword
                },
                success: function (data) {
                    notyf.confirm('Update your profile successfully!!!');
                    this.hideModal();
                    this.logout();
                }.bind(this),
                error: function (err) {
                    this.hideModal();
                }.bind(this)
            });
        }
    }

    validateInput() {
        if (!this.state.name.trim().match(/^[a-zA-Z0-9_]{2,30}$/)) {
            notyf.alert("Username can't contain special character except '_' character");
            return false;
        }
        if (!this.state.newPassword.trim().match(/^[0-9a-zA-Z@]{6,}$/)
            || !this.state.oldPassword.trim().match(/^[0-9a-zA-Z@]{6,}$/)) {
            notyf.alert("The length of password must be 6 character at least");
            return false;
        } else if (this.state.newPassword.trim() !== this.state.confirmPassword.trim()) {
            notyf.alert('New Password and Confirm Password is not match');
            return false;
        }
        return true;
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
                accessor: 'nameDeivce',
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
                                    Update Profile
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem onClick={this.logout}>
                                    <span className="glyphicon glyphicon-log-out"/>&nbsp;
                                    Logout
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
                            <Modal.Title id="contained-modal-title-lg">Update Profile</Modal.Title>
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
                                    value={this.state.name}
                                    onBlur={this.validateInput}
                                />
                            </div>
                            {/* old password*/}
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="txtPassword"
                                    placeholder="Old Password"
                                    required
                                    onChange={(event) => this._handleChange(event, 'oldPassword')}
                                    onBlur={this.validateInput}
                                />
                            </div>
                            {/* new password*/}
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-key" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="txtPassword"
                                    placeholder="New Password"
                                    required
                                    onChange={(event) => this._handleChange(event, 'newPassword')}
                                    onBlur={this.validateInput}
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
                                    onBlur={this.validateInput}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.handleSubmitProfile}>Save</Button>
                            <Button onClick={this.hideModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </nav>
                <div className="container col-md-12" id="con">

                    <div className="col-xs-12 col-md-7 " id="map">
                        <MyMap markerList={this.state.markers}
                               centerPoint={this.state.center}
                               pathList={this.state.paths}/>
                    </div>
                    <div className="col-xs-12 col-md-5" id="table-area">
                        <div className="col-xs-12 col-md-12" id="search-area">
                            <form action="http://localhost:8080/home/locations" method="GET" className="form-inline"
                                  id="filter-form">
                                <h5>Select day to tracking your GPS <cite>(MM-DD-YYYY)</cite>:</h5>
                                <div className="col-xs-12 col-md-12">
                                    <CalendarInput/>
                                    <div className="col-md-2">
                                        <button type="button" id="btnSeach" onClick={this.handleFormSubmit}
                                                className="btn btn-success">Search
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="col-xs-12 col-md-12" id="sync-button">
                            <button onClick={function (event) {
                                event.preventDefault();
                                PARAM_FROMDATE = moment().format('MM/DD/YYYY 00:00:00');
                                PARAM_TODATE = moment().format('MM/DD/YYYY 23:59:59');
                                PARAM_PAGE = 1;
                                viewStatus = true;
                                this.fetchSearchLocation();
                                notyf.confirm("Update current location");
                            }.bind(this)} className="btn btn-success">
                                Synchronize <span className="glyphicon glyphicon-refresh"/>
                            </button>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <ReactTable
                                data={this.state.listLoc}
                                columns={columns}
                                defaultPageSize={10}
                                showPageSizeOptions={false}
                                pageSizeOptions={[10]}
                                showFilters={true}
                                getTdProps={(state, rowInfo, column, instance) => {
                                    return {
                                        onClick: e => {
                                            if (rowInfo !== undefined) {
                                                this.setState({
                                                    center: {},
                                                    markers: [],
                                                });
                                                let nextMarkers = {
                                                    position: {
                                                        lat: parseFloat(rowInfo.rowValues.latitude),
                                                        lng: parseFloat(rowInfo.rowValues.longitude),
                                                    },
                                                    defaultAnimation: 2,
                                                    key: rowInfo.rowValues.time.trim(), // Add a key property for: http://fb.me/react-warning-keys
                                                };
                                                var dup = false;
                                                var count = 0;
                                                markers.forEach((el) => {
                                                    count++;
                                                    if ((el.key.trim() === nextMarkers.key)
                                                        && (el.position.lat === nextMarkers.position.lat)
                                                        && (el.position.lng === nextMarkers.position.lng)
                                                        && (count === 2)
                                                    ) {
                                                        dup = true;
                                                    }
                                                });
                                                count = 0;
                                                if (!dup) {
                                                    if (markers.length === 2) {
                                                        markers.splice(1, 0, nextMarkers);
                                                    } else if (markers.length === 3) {
                                                        markers.splice(1, 1, nextMarkers);
                                                    }
                                                } else {
                                                    if (markers.length === 3) {
                                                        markers.splice(1, 1);
                                                    }
                                                }

                                                this.setState({
                                                    center: {
                                                        lat: parseFloat(rowInfo.rowValues.latitude),
                                                        lng: parseFloat(rowInfo.rowValues.longitude),
                                                    },
                                                    markers: markers,
                                                });
                                            }
                                        }
                                    }
                                }}
                                defaultFilterMethod={(filter, row, column) => {
                                    const id = filter.pivotId || filter.id;
                                    return row[id] !== undefined ? (String(row[id]).indexOf(filter.value) >= 0) : true;
                                }}
                                onChange={ () => {
                                    //fix hover background with null row
                                    var listRow = document.getElementsByClassName('rt-tr-group');
                                    for (var i = 0; i < listRow.length; i++) {
                                        if (listRow[i].innerText.trim() === '') {
                                            listRow[i].setAttribute('style', 'background-color: #fff');
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