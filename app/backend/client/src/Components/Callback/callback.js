import React, { Component } from "react";
import axios from "axios";
import Loader from "../utils/Loader";
import { Navigate } from "react-router-dom";

// this component is the callback url, sends the callback url to the backend to generate access tokens
class Callback extends Component {
	constructor(props) {
		super(props);
		this.state = { goHome: false, goBack: false, success: false };
	}
	async componentDidMount() {
		// get url and check if action was cancelled or something went wrong
		let url = new URL(window.location);
		let query = new URLSearchParams(url.search);
		let callback_url = window.location.href;
		if (query.has("error")) {
			this.setState({ goBack: true });
		} else {
			await axios({
				method: "get",
				url: "/users/callback_verifier/",
				params: { response_url: callback_url },
			})
				.then((res) => {
					if (res.data.boolean) {
						console.log("data fetched callback");
						let { id, username } = res.data;
						sessionStorage.setItem("loginSuccess", "1");
						this.setState({ goHome: true });
					} else {
						sessionStorage.setItem("error", "1");
						this.setState({ goBack: true });
						console.log(res.data.message, "callback");
					}
					console.log(res);
				})
				.catch((err) => {
					sessionStorage.setItem("error", "1");
					this.setState({ goBack: true });
				});
		}
	}
	render() {
		return (
			<div>
				{this.state.goBack && <Navigate to="/login" replace={true} />}
				{this.state.goHome && <Navigate to="/home" replace={true} />}
				<Loader />
			</div>
		);
	}
}

export default Callback;
