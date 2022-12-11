import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";
import Card from "react-bootstrap/Card";
import "./home.scss";
import search from "../images/search.svg";
import Header from "../header/header";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInAs: {
				id: "",
				username: "",
				name: "",
				image: "",
			},
		};
		this.cookies = new Cookies();
		this.showState = this.showState.bind(this);
	}

	async componentDidMount() {
		const id = this.cookies.get("id");
		console.log("home", id);
		await axios({
			method: "get",
			url: "users/",
			params: { id: id },
		})
			.then((res) => {
				if (res.data.boolean) {
					let { username, name, image } = res.data;
					this.setState({
						loggedInAs: {
							id: id,
							username: username,
							name: name,
							image: image,
						},
					});
				}
			})
			.catch((err) => console.log(err));
	}
	showState() {
		console.log(this.state, "show state func");
	}

	render() {
		return (
			<div className="main-div">
				<Header
					image={this.state.loggedInAs.image}
					name={this.state.loggedInAs.name}
					username={this.state.loggedInAs.username}
				/>
				<div className="body-div">dscnsjdncosdncoisd</div>
			</div>
		);
	}
}

export default Home;
