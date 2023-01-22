import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";
import Loader from "../utils/Loader";

class Callback extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cookies = new Cookies();
	}
	async componentDidMount() {
		let url = new URL(window.location);
		let query = new URLSearchParams(url.search);
		let callback_url = window.location.href;
		if (query.has("error")) {
			// replace with toast
			console.log("access denied try again");
			history.push("/login");
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
						this.cookies.set("id", id, { path: "/" });
						this.cookies.set("username", username, { path: "/", maxAge: 31536000 });
						history.push("/home");
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
				<Loader />
			</div>
		);
	}
}

export default Callback;
