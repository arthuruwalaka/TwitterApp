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
		if ("denied" in query) {
			// replace with toast
			console.log("access denied try again");
			history.push("/login");
		} else {
			const oauth_token = query.get("oauth_token");
			const oauth_verifier = query.get("oauth_verifier");
			try {
				await axios({
					method: "get",
					url: "/users/callback_verifier",
					params: { oauth_token: oauth_token, oauth_verifier: oauth_verifier },
				}).then((res) => {
					if (res.data.boolean) {
						console.log("data fetched callback");
						let { id, username } = res.data;
						this.cookies.set("id", id, { path: "/" });
						history.push("/home", { loggedInAs: id });
					} else {
						// replace with toast
						console.log(res.data.message, "callback");
					}
					console.log(res);
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
	render() {
		return <div>loading</div>;
	}
}

export default Callback;
