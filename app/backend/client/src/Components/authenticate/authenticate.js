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
			url: "users/twitter_login/",
		})
			.then((res) => {
				//go to get twitter verifier url
				if (res.data.boolean) {
					this.getCallBack(res.data.url);
				} else {
					//replace with toast, unable to login
					history.push("/login");
				}
			})
			.catch((err) => console.log(err));
	}

	getCallBack(url) {
		history.push(url);
	}

	render() {
		return (
			<div>
				<Loader />
			</div>
		);
	}
}

export default Authenticate;
