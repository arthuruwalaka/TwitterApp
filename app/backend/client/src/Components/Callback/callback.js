import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";

class Callback extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cookies = new Cookies();
	}
	async componentDidMount() {
		const query = new URLSearchParams(window.location.search);
		const callback_url = window.location.href;
		if ("denied" in query) {
			// replace with toast
			console.log("access denied try again");
			history.push("/login");
		} else {
			console.log(query);
			console.log(callback_url);
			// const oauth_token = query.get("oauth_token");
			// const oauth_verifier = query.get("oauth_verifier");
			// await axios({
			// 	method: "get",
			// 	url: "/users/callback_verifier/",
			// 	params: { oauth_token: oauth_token, oauth_verifier: oauth_verifier },
			// })
			// 	.then((res) => {
			// 		if (res.data.boolean) {
			// 			console.log("data fetched callback");
			// 			let { id, username } = res.data;
			// 			this.cookies.set("id", id, { path: "/" });
			// 			this.cookies.set("username", username, { path: "/", maxAge: 31536000 });
			// 			history.push("/home");
			// 		} else {
			// 			// replace with toast
			// 			console.log(res.data.message, "callback");
			// 		}
			// 		console.log(res);
			// 	})
			// .catch((err) => console.log(err));

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
		return <div>loading</div>;
	}
}

export default Callback;
