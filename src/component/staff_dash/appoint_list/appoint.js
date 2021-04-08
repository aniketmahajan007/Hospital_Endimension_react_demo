import React, {Component} from 'react';

class Appoint extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list_data = this.props.list_data;
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Appointment Reason</th>
                        <th scope="col">Slot</th>
                        <th scope="col">City, State</th>
                        <th scope="col">Mobile Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list_data.length < 1 ? <span>No Appointment Found Today</span> : list_data.map((list, index) => (
                            <tr key={index}>
                                <td>{list[0]} {list[1]}</td>
                                <td>{list[5]}</td>
                                <td>{list[6]} - {list[7]}</td>
                                <td>{list[2]}, {list[3]}</td>
                                <td>{list[4]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Appoint;
