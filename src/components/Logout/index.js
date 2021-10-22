import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as action from "../../redux/actions/signupActions";
class Logout extends React.Component{
    componentDidMount = () => {
        this.props.logout()
    }
    render() {
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch(action.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);