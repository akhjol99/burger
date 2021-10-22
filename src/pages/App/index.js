import React, { Component } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import Login from "../Login";
import SignUp from "../SignUp";
import { logout } from "../../redux/actions/signupActions";
import Logout from "../../components/Logout";
import {Redirect} from "react-router-dom";
import * as actions from  "../../redux/actions/loginActions";

class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      this.props.autoLogin(token, userId);
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          User ID: {this.props.userId}
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} /> 
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
          )}
          
        </main>
      </div>
    );
  }
};
const mapStateToProps = state =>{
  return {
    userId: state.signupReducer.userId
  }
}
const mapDispatchToProps = dispatch => {
  return{
      autoLogin: (token, userId) => dispatch(actions.loginUserSuccess(token, userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
