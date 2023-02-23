import React, { Component } from "react";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import Loader from "../utils/Loader";
import "./logout.scss";

class LogoutComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { goBack: false, goHome: false, isLoading: false };
		this.goHome = this.goHome.bind(this);
		this.logout = this.logout.bind(this);
		this.doNothing = this.doNothing.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.setState({ goBack: true });
	}
	goHome() {
		this.setState({ goHome: true });
	}

	async logout() {
		this.setState({ isLoading: true });
		await axios({
			method: "get",
			url: "users/twitter_logout/",
		})
			.then((res) => {
				console.log(res, "logout");
				// this.goHome();
			})
			.catch((err) => console.log(err));

		this.goBack();
	}

	doNothing(e) {
		e.stopPropagation();
	}

	render() {
		return (
			<div className="logout-div" onClick={this.goHome}>
				{this.state.isLoading && <Loader />}
				{this.state.goHome && <Navigate to="/home" />}
				{this.state.goBack && <Navigate to="/login" replace={true} />}
				<div className="logout-card" onClick={this.doNothing}>
					<p style={{ fontSize: "19px", fontWeight: "700" }}> Do you want to logout?</p>
					<button className="logout-bttn" onClick={this.logout}>
						Log out
					</button>
					<button className="cancel-bttn" onClick={this.goHome}>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default LogoutComponent;
