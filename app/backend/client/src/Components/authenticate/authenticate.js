import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Loader from "../utils/Loader";

// this component gets the  call back url and sends the application to that url
class Authenticate extends Component {
	constructor(props) {
		super(props);
		this.state = { goBack: false };
		this.getCallBack = this.getCallBack.bind(this);
	}
	async componentDidMount() {
		await axios({
			method: "get",
			url: "users/twitter_login/",
		})
			.then((res) => {
				// get call back url and route app there
				if (res.data.boolean) {
					this.getCallBack(res.data.url);
				} else {
					sessionStorage.setItem("error", "1");
					this.setState({ goBack: true });
				}
			})
			.catch((err) => {
				sessionStorage.setItem("error", "1");
				this.setState({ goBack: true });
			});
	}

	getCallBack(url) {
		history.push(url);
	}

	render() {
		return (
			<div>
				{this.state.goBack && <Navigate to="/login" replace={true} />}
				<Loader />
			</div>
		);
	}
}

export default Authenticate;
