import React, { Component } from "react";
import TwitterLogin from "react-twitter-login";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";

class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		// localStorage.clear();
	}
	// componentDidMount() {
	// 	// let id = this.cookies.get("id");
	// 	console.log(id, "cookies test");
	// 	if (id) {
	// 		this.setState({ loggedInAs: id });
	// 	}
	// }

	authHandler = (err, data) => {
		console.log(err, data);
	};

	handleClick = () => {
		console.log("loggegegegeg", this.state);
		history.push("/authenticate", { loggedInAs: this.state.loggedInAs });
	};

	render() {
		// console.log("arthur login");
		return (
			<div>
				{/* <TwitterLogin
                authCallback = {this.authHandler}
                // consumerKey = {process.env.REACT_APP_API_KEY}
                // consumerSecret = {process.env.REACT_APP_API_KEY_SECRET}
                callbackUrll = {process.env.CALLBACK_URL}
            /> */}

				<button onClick={this.handleClick}>Enter</button>
			</div>
		);
	}
}
export default LoginComponent;
