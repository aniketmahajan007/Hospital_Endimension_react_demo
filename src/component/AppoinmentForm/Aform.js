import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css'
import React, {useState} from "react";
import Spinner from '../../static/spinner.gif';
import '../spinner.css';

export default function Aform(props){
    const [spinner,update_spinner] = useState({"display":"none"})
    const [startDate, setStartDate] = useState(new Date());
    const [fname, onCfname] = useState("");
    const onChangefname = (pass) => {
        onCfname(pass.target.value);
    }
    const [lname, onClname] = useState("");
    const onChangelname = (pass) => {
        onClname(pass.target.value);
    }
    const [areason, onCareason] = useState("");
    const onChangeareason = (pass) => {
        onCareason(pass.target.value);
    }
    const [state, onCstate] = useState("");
    const onChangestate = (pass) => {
        onCstate(pass.target.value);
    }
    const [city, onCcity] = useState("");
    const onChangecity = (pass) => {
        onCcity(pass.target.value);
    }
    const [anumber, onCanumber] = useState("");
    const onChangeanumber = (pass) => {
        onCanumber(pass.target.value);
    }
    const onSubmitform = (e) => {
        if(fname.length <2 || lname.length <2 || areason.length < 2 || state.length < 2 || city.length < 2 || startDate.length < 8){
            onupdate_form_error("Please fill all the details properly")
        }else{
            if(anumber.length === 10 && parseInt(anumber) === Number(anumber)){
                update_spinner({"display":"block"})
                fetch(`https://hospitalendimension.herokuapp.com/appointment`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin":"*",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        user: props.user,
                        fname:fname,
                        lname:lname,
                        areason:areason,
                        state: state,
                        city:city,
                        adate: startDate,
                        anumber:anumber
                    }),
                })
                    .then(response => response.json())
                    .then((data) =>{
                        onCfname("");
                        onClname("");
                        onCareason("");
                        onCstate("");
                        onCcity("");
                        onCanumber("");
                        if(data["status"] === "already"){
                            alert("Your appointment has been already added this date, Check appointment tab for more details");
                        }else if(data["status"] === "success"){
                            alert("Your appointment has been successfully added, Check appointment tab for more details");
                        }
                        update_spinner({"display":"none"});
                    }).catch(()=>{
                        update_spinner({"display":"none"});
                    alert("Unknown error occurred, please try again later");
                })
            }else{
                onupdate_form_error("Invalid Mobile Number")
            }
        }
    }
    const [form_error, update_form_error] = useState("");
    const onupdate_form_error = (value) => {
        update_form_error(value);
    }
    return(
        <form style={props.isshow}>
            <p>Book Appointment:</p>
            <div id="loading" style={spinner}>
                <img id="loading-image" src={Spinner} alt="Loading..." />
            </div>
            <div className="row">
                <div className="col">
                    <label>Enter first name</label>
                    <input required type="text" onChange={onChangefname} className="form-control" value={fname} placeholder="First name"/>
                </div>
                <div className="col">
                    <label>Enter last name</label>
                    <input required type="text" value={lname} onChange={onChangelname} className="form-control" placeholder="Last name"/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <label>Enter Appointment Reason</label>
                    <input value={areason} onChange={onChangeareason} required type="text" className="form-control" placeholder="Enter Appointment Reason" />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <label>Enter state</label>
                    <input value={state} onChange={onChangestate} required type="text" className="form-control" placeholder="Enter state"/>
                </div>
                <div className="col">
                    <label>Enter city</label>
                    <input value={city} onChange={onChangecity} required type="text" className="form-control" placeholder="Enter City"/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <label style={{"marginRight": "2em"}}>Select Appointment: </label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} minDate={new Date()} />
                </div>
                <div className="col">
                    <label>Enter Mobile Number</label>
                    <input maxLength="10" value={anumber} onChange={onChangeanumber} required type="text" className="form-control" placeholder="Enter Mobile Number"  />
                </div>
            </div>
            <br/>
            <span className="text-center" style={{"color":"red"}}>{form_error} <br/></span>
            <br/>
            <div style={{"textAlign":"center"}}>
                <button type="button" onClick={onSubmitform} className="btn btn-primary" style={{"width":"500px"}} >Confirm Booking</button>
            </div>
        </form>
    )
}
