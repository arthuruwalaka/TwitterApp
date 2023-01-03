import React, { Component } from "react";
import { InputGroup, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
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
			input: "",
		};
		this.cookies = new Cookies();
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.trySearch = this.trySearch.bind(this);

		this.printState = this.printState.bind(this);
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

		await this.getBookmarks();
	}
	async getBookmarks() {
		const id = this.cookies.get("id");
		await axios({
			method: "get",
			url: "tweets/bookmarks/",
			params: { id: id },
		})
			.then((res) => {
				console.log(res.data.message);
			})
			.catch((err) => console.log("err"));
	}

	handleInputChange(e) {
		var input = e.target.value;
		this.setState({ input });
	}
	handleKeyUp(e) {
		console.log("on key up");
		if (e.key === "Enter") {
			console.log("enter");
			this.trySearch();
		}
	}

	async trySearch() {
		console.log("try searchs");
		var keyword = this.state.input;
		console.log("keyword", keyword);
		var id = this.state.loggedInAs.id;
		await axios({
			method: "get",
			url: "tweets/search/",
			params: { q: keyword },
		}).then((res) => {
			console.log(res);
		});
	}

	printState(e) {
		e.preventDefault();
		console.log(this.state.input);
	}

	render() {
		return (
			<div className="main-div">
				<Header
					image={this.state.loggedInAs.image}
					name={this.state.loggedInAs.name}
					username={this.state.loggedInAs.username}
				/>
				{/* <button className="books" onClick={this.getBookmarks}>
					{" "}
					get bookmarks
				</button> */}

				<div className="content">
					<form className="search-form">
						<button className="search-bttn" onClick={this.printState}>
							<img className="search-img" src={search} />
						</button>
						<input
							type="search"
							className="search-bar"
							placeholder="Search Bookmarks"
							onChange={(e) => this.handleInputChange(e)}
							onKeyUp={(e) => this.handleKeyUp(e)}
						></input>
					</form>
					{/* <InputGroup>
						<Form.Control className="search-bar" placeholder="Search Bookmarks" />
					</InputGroup> */}
				</div>
			</div>
		);
	}
}

export default Home;
