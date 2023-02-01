import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Loader from "../utils/Loader";
import { Navigate } from "react-router-dom";

class Callback extends Component {
	constructor(props) {
		super(props);
		this.state = { goHome: false, goBack: false };
	}
	async componentDidMount() {
		let url = new URL(window.location);
		let query = new URLSearchParams(url.search);
		let callback_url = window.location.href;
		console.log("callback");
		if (query.has("error")) {
			// replace with toast
			console.log("access denied try again");
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
						// this.cookies.set("id", id, { path: "/" });
						// this.cookies.set("username", username, { path: "/", maxAge: 31536000 });
						this.setState({ goHome: true });
					} else {
						// replace with toast
						console.log(res.data.message, "callback");
					}
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}
	render() {
		return (
			<div>
				{this.state.goBack && <Navigate to="/login" replace={true} />}
				{this.state.goHome && <Navigate to="/home" replace={true} />}
				{/* <Loader /> */}
				hjncjnsjncdcnj
			</div>
		);
	}
}

export default Callback;
