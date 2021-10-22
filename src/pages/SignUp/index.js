import React, {Component} from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/signupActions";
import {connect} from "react-redux";
import Spinner from "../../components/General/Spinner";
import {Redirect} from "react-router-dom";
class SignUp extends Component{
    state = {
        email: "",
        password: "",
        password1: "",
        error: ""

    };

    signup = () => {
        if(this.state.password === this.state.password1){
            this.props.signupUser(this.state.email, this.state.password);
        }else{
            this.setState({error: "Нууц үгнүүд хоорондоо таарахгүй байна!"})
        }
        
    };
    changeEmail = (event) => {
        this.setState({email: event.target.value});
    };
    changePassword = (event) => {
        this.setState({password: event.target.value});
    };
    changePassword1 = (event) => {
        this.setState({password1: event.target.value});
    };
    render() {
        return(
            <div className={css.SignUp}>
                {this.props.userId && <Redirect to="/orders" />}
                <h1>Бүртгэлийн форм</h1>
                <div>Та өөрийн мэдээллээ оруулна уу</div>
                <input onChange={this.changeEmail} type="text" placeholder="Имайл хаяг" />
                <input onChange={this.changePassword} type="password" placeholder="Нууц үгээ оруулна уу" />
                <input onChange={this.changePassword1} type="password" placeholder="Нууц үгээ давтан оруулна уу" />

                {this.state.error && (<div style={{color:"red"}}>{this.state.error}</div>)}
                {this.props.firebaseError && (<div style={{color:"red"}}>{this.props.firebaseError}</div>)}
                {this.props.saving && <Spinner />}

                <Button text="Бүртгүүлэх" btnType="Success" daragdsan={this.signup} /> 
            </div>
        );
    };

};
const mapStateToProps = state =>{
    return {
        saving: state.signupReducer.saving,
        firebaseError: state.signupReducer.firebaseError,
        userId: state.signupReducer.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signupUser: (email, password) =>
           dispatch(actions.signupUser(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);