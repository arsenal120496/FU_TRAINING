/**
 * Created by Asus on 4/4/2017.
 */
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'

export default class datePicker extends Component {
    Constructor() {
        this.handleChange = this.handleChange().bind(this);
    }

    getInitialState() {
        return {
            startDate: moment('2014-02-08'),
            endDate: moment('2014-02-10')
        };
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                selectsStart startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChange}/>
        );
    }

}
