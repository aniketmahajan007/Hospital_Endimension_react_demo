import React, {Component} from 'react';

class PatientAppoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_data:[]
        }
    }
    componentDidMount() {
        fetch(`https://hospitalendimension.herokuapp.com/user_appointment?user=${this.props.user}`,{
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }
        })
            .then(response => response.json())
            .then((data) =>{
                this.setState({
                    list_data: data
                });
                console.log(data);
            }).catch(()=>{
            alert("Unknown error occurred, please try again later");
        })
    }

    render() {
        let list_data = this.state.list_data;
        return (
            <div style={this.props.isshow}>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Appointment Reason</th>
                        <th scope="col">Date</th>
                        <th scope="col">City, State</th>
                        <th scope="col">Mobile Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list_data.length < 1 ? <span>Not</span> : list_data.map((list, index) => (
                            <tr key={index}>
                                <td>{list[0]} {list[1]}</td>
                                <td>{list[5]}</td>
                                <td>{list[6]}</td>
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

export default PatientAppoint;
