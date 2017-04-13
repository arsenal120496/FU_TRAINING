/**
 * Created by Asus on 4/4/2017.
 */
import React, {Component} from 'react';
import ReactTable from 'react-table'
import '../resource/bootstrap/css/bootstrap.min.css';
import './main.css';

/*calendar*/
/*import 'https://unpkg.com/flatpickr/dist/flatpickr.min.css'*/

/*import Flatpickr from 'react-flatpickr'*/

class Table extends Component {

    render() {
        const {list} = this.props;
        return (
            <div className="container col-md-12">
                {/*<Flatpickr options={{minDate: '2017-01-01'}}  />*/}

                {/*<div className="form-field-wrapper">
                    <select name="status">
                        <option value="0">Device 1</option>
                        <option value="1">Device 2</option>
                        <option value="2">Device 3</option>
                    </select>
                </div>*/}
                <table className="table table-striped table-hover" id="location">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Location</th>
                        <th>Device</th>
                    </tr>
                    </thead>
                    <tbody>

                    {list.map(item =>
                        <tr key={item.id} >
                            <td>{list.indexOf(item) + 1}</td>
                            <td>[{item.location.latitude}] - [{item.location.longitude}]</td>
                            <td>{item.nameDeivce}</td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>

        );
    }
}

export
default
Table;