var React = require("react");
var { Link, IndexLink } = require("react-router");
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import LoginDialog from "app/components/loginmodal.jsx";
import SignupDialog from "app/components/signupmodal.jsx";
import FirstPage from "app/components/firstpage.jsx";
import { AppBar, IconButton, MenuItem } from "material-ui";

import muiThemeable from "material-ui/styles/muiThemeable";
// import { login } from "auth.js";
const greenbutton = {
  backgroundColor: "#00E676"
};
import { browserHistory } from "react-router";

export default class NewNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var optionsLogin = {
      languageDictionary: {
        emailInputPlaceholder: "something@youremail.com",
        title: "Log In"
      },
      allowSignUp: false,

      // allowLogin: false,

      theme: {
        logo: "https://image.ibb.co/mMtqJF/Klogo_Original_Green_K.png",
        primaryColor: "#00E676"
      }
    };

    var optionsSignup = {
      languageDictionary: {
        emailInputPlaceholder: "something@youremail.com",
        title: "Sign Up"
      },
      allowLogin: false,

      theme: {
        logo: "https://image.ibb.co/mMtqJF/Klogo_Original_Green_K.png",
        primaryColor: "#00E676"
      }
    };

    this.lockLogin = new Auth0Lock(
      "xDe229e1uR9PPKZMutFVk4QZYpAVU9l6",
      "kolaboard.auth0.com",
      optionsLogin
    );
    this.lockSignup = new Auth0Lock(
      "xDe229e1uR9PPKZMutFVk4QZYpAVU9l6",
      "kolaboard.auth0.com",
      optionsSignup
    );
  }
  render() {
    const style = {
      margin: 12,
      width: "160px",
      height: "40px"
    };

    const colormodal = {
      backgroundColor: "#00E676"
    };

    return (
      <MuiThemeProvider>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <img src="Klogo.png" style={style} />
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <LoginDialog title="Log In" lock={this.lockLogin} />
              </li>

              <li>
                <SignupDialog title="Sign Up" lock={this.lockSignup} />
              </li>
            </ul>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
