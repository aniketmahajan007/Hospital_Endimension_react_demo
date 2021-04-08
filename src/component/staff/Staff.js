import '../navbar/Navbar.css'
import UserImage from '../../static/user.png';
import React from "react";
import StaffJson from '../../data/hospital_dummy.json';
import {Link, Redirect} from "react-router-dom";
import Spinner from '../../static/spinner.gif';
import '../spinner.css';


class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: "",
            error: "",
            log: 0,
            spinner:{"display":"none"}
        }
    }
    onUserPass = (pass) => {
        this.setState({
            pass: pass.target.value
        })
    }
    onUserChange = (pass) => {
        this.setState({
            username: pass.target.value
        })
    }
    onClickSubmit = () => {
        const user = this.state.username;
        const pass = this.state.pass;
        if(user.length < 4 || pass.length < 4){
            this.setState({
                username: this.state.username,
                pass: this.state.pass,
                error:"Invalid username and password"
            })
        }else{
            this.setState({
                spinner:{"display":"block"}
            })
            fetch(`https://hospitalendimension.herokuapp.com/staff?user=${user}&pass=${pass}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            })
                .then(response => response.json())
                .then((data) =>{
                    if(data.length < 1){
                        this.setState({
                            error:"Invalid username and password",
                            spinner:{"display":"none"}
                        })
                    }else{
                        data = data[0];
                        this.props.Statehandler(data[1],0);
                        this.setState({
                            log:1,
                            error:"",
                            spinner:{"display":"none"}
                        });
                    }
                })
        }
    }
    render() {
        if(this.state.log){
            return <Redirect to={{ pathname: '/Staff_Dash',state:{username: this.state.username} }}  />
        }else{
            return(
                <div className="ftco-section">
                    <div id="loading" style={this.state.spinner}>
                        <img id="loading-image" src={Spinner} alt="Loading..." />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section">Hospital Booking Site</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img id="user_img_80" src={UserImage} alt="User Image" />
                                    </div>
                                    <h3 className="text-center mb-4">Staff Login</h3>
                                    <form action="#" className="login-form">
                                        <div className="form-group">
                                            <input onChange={this.onUserChange} type="text" className="form-control rounded-left" value={this.state.username} placeholder="Username"
                                                   required/>
                                        </div>
                                        <div className="form-group d-flex">
                                            <input onChange={this.onUserPass} type="password" className="form-control rounded-left" value={this.state.pass} placeholder="Password"
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <button onClick={this.onClickSubmit} type="button"
                                                    className="form-control btn btn-primary rounded submit px-3">Login
                                            </button>
                                            <span style={{"color":"red"}}><br/><br/>{this.state.error}</span>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50 text-md-left">
                                            <span id="staff_login">
                                                <Link to="/">Patient Login</Link>
                                            </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Staff;
