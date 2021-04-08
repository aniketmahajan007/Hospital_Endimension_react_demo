import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Spinner from '../../static/spinner.gif';
import '../spinner.css';
import Appoint from "./appoint_list/appoint";

class StaffDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: {"display":"block"},
            once:1,
            list_data:[]
        }
    }
    componentDidMount() {
        if(this.state.once){
            this.setState({
                once: 0
            })
            fetch(`https://hospitalendimension.herokuapp.com/all_appointment`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            })
                .then(response => response.json())
                .then((data) =>{
                    this.setState({
                        spinner:{"display":"none"},
                        list_data: data
                    });
                }).catch(()=>{
                alert("Unknown error occurred, please try again later");
                this.setState({
                    spinner:{"display":"none"}
                });
            })
        }
    }

    onLogout = () =>{
        this.props.Statehandler("","");
    }
    render() {
        if (this.props.login_info.globaluser.length < 5){
            return <Redirect to="/Staff"  />
        }else{
            return (
                <div className="container" style={{"marginTop":"4em"}}>
                    <div id="loading" style={this.state.spinner}>
                        <img id="loading-image" src={Spinner} alt="Loading..." />
                    </div>
                    <button onClick={this.onLogout} className="btn-primary btn" style={{"float":"right"}}>Log Out</button>
                    <h4>Welcome back, {this.props.login_info.globaluser.charAt(0).toUpperCase() + this.props.login_info.globaluser.substr(1)}</h4>
                    <hr id="line_username" />
                    <h4 className="text-center">Today's Appointment</h4>
                    <br/>
                    <Appoint list_data={this.state.list_data} />
                </div>
            );
        }
    }
}

export default StaffDash;
