import React from 'react';
import Navbar from "./component/navbar/Navbar";
import {Switch, Route} from "react-router-dom"
import Staff from "./component/staff/Staff";
import Patient_dash from "./component/patient_dash/Patient_dash";
import StaffDash from "./component/staff_dash/staff_dash";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globaluser: "",
      logintype: ""
    }
    this.Statehandler = this.Statehandler.bind(this)
  }
  Statehandler = (globaluser,logintype) => {
    this.setState({
      globaluser: globaluser,
      logintype: logintype
    });
  }

  render() {
    return (
        <>
          <Switch>
            <Route exact path="/" render={() => <Navbar Statehandler={this.Statehandler} />  } />
            <Route exact path="/Staff" render={() => <Staff Statehandler={this.Statehandler} />} />
            <Route exact path="/Patient_Dash" render={() => <Patient_dash Statehandler={this.Statehandler} login_info={this.state} />} />
            <Route exact path="/Staff_Dash" render={() => <StaffDash Statehandler={this.Statehandler} login_info={this.state} />} />
          </Switch>
        </>
    );
  }
}

export default App;
