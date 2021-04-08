import React from "react";
import './Patient_dash.css'
import Doctorimg from '../../static/doctor.jfif';
import {Redirect} from "react-router-dom";
import Aform from "../AppoinmentForm/Aform";
import PatientAppoint from "./patient_appoint/patient_appoint";

class Patient_dash extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            aform: {"display":"block"},
            patientdash: {"display":"none"},
            buttontext: "Your Appointments"
        }
    }
    onLogout = () =>{
        this.props.Statehandler("","");
    }
    TabSwitch = () => {
        if(this.state.buttontext ==="Your Appointments"){
            this.setState({
                aform: {"display":"none"},
                patientdash: {"display":"block"},
                buttontext: "Book Appointment"
            })
        }else{
            this.setState({
                aform: {"display":"block"},
                patientdash: {"display":"none"},
                buttontext: "Your Appointments"
            })
        }

    }
    render() {
        if (this.props.login_info.globaluser.length < 5){
            return <Redirect to="/"  />
        }else{
            return(
                <div>
                    <div className="row">
                        <div className="col" id="left_side">
                            <button onClick={this.TabSwitch} className="btn-danger btn" style={{"float":"right","margin-left":"1.4em"}}>{this.state.buttontext}</button>
                            <button onClick={this.onLogout} className="btn-primary btn" style={{"float":"right"}}>Log Out</button>
                            <h4>Welcome back, {this.props.login_info.globaluser.charAt(0).toUpperCase() + this.props.login_info.globaluser.substr(1)}</h4>
                            <hr id="line_username" />
                            <br/>
                            <PatientAppoint isshow={this.state.patientdash} user={this.props.login_info.globaluser}  />
                            <Aform isshow={this.state.aform} user={this.props.login_info.globaluser} />
                        </div>
                        <div className="col">
                            <img id="right_side" src={Doctorimg} alt="nice" />
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Patient_dash;
