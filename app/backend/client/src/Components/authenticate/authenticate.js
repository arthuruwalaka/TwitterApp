import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Loader from "../utils/Loader";

class Authenticate extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.getCallBack = this.getCallBack.bind(this);
	}
	async componentDidMount() {
		await axios({
			method: "get",
			url: "/users/twitter_login/",
		})
			.then((res) => {
				if (res.data.boolean) {
					console.log("data fetched authenticate");
					this.getCallBack(res.data.url);
				} else {
					//replace with toast
					console.log("unable to login , authenticate");
					console.log(res.data);
					history.push("/login");
				}
			})
			.catch((err) => console.log(err));
	}

	getCallBack(url) {
		history.push(url);
	}

	render() {
		// console.log("rednder");
		return (
			<div>
				<Loader />
			</div>
		);
	}
}

export default Authenticate;
