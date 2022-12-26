import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";
import Card from "react-bootstrap/Card";
import "./home.scss";
import search from "../images/search.svg";
import Header from "../header/Header";
import Tweet from "../tweet/Tweet";

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
		this.getBookmarks = this.getBookmarks.bind(this);
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
	async getBookmarks() {
		const id = this.cookies.get("id");
		await axios({
			method: "get",
			url: "tweets/bookmarks/",
			params: { id: id },
		})
			.then((res) => {
				console.log("snvojsdn");
			})
			.catch((err) => console.log("err"));
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
				<button className="books" onClick={this.getBookmarks}>
					{" "}
					get bookmarks
				</button>
			</div>
		);
	}
}

export default Home;
