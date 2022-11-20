import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";

class Authenticate extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.getCallBack = this.getCallBack.bind(this);
	}
	async componentDidMount() {
		try {
			await axios({
				method: "get",
				url: "/users/twitter_login",
			}).then((res) => {
				if (res.data.boolean) {
					console.log("data fetched authenticate");
					this.getCallBack(res.data.url);
				} else {
					//replace with toast
					console.log("unable to login , authenticate");
					history.push("/login");
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	getCallBack(url) {
		history.push(url);
	}
	goHome() {
		console.log("straight home", this.state.loggedInAs);
		history.push("/home", {
			loggedInAs: this.state.loggedInAs,
		});
	}

	render() {
		// console.log("rednder");
		return (
			<div>
				<img src="http://placekitten.com/g/200/300"></img>
			</div>
		);
	}
}

export default Authenticate;
