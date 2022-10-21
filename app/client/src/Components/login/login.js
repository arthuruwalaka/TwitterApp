import React, { Component } from "react";
import TwitterLogin from "react-twitter-login"


class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            ...this.props.state
        }
        localStorage.clear()
    }

    authHandler= (err, data) =>{
        console.log(err,data)
    }

    render(){
        return(
            <TwitterLogin
                authCallback = {this.authHandler}
                consumerKey = {process.env.REACT_APP_API_KEY}
                consumerSecret = {process.env.REACT_APP_API_KEY_SECRET}
                callbackUrll = {"http://127.0.0.1:8000/home"}
            />
        ) 
    }
}
export default LoginComponent