import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import "./home.scss";
import "../../index.css";
import searchBlue from "../images/search-blue.svg";
import searchGrey from "../images/search-grey.svg";
import Header from "../header/Header";
import Tweet from "../tweet/Tweet";
import RequireLoginComponent from "../utils/requireLoginComponent";

class Home extends RequireLoginComponent {
	constructor(props) {
		super(props);
		this.state = {
			loggedInAs: {
				username: "",
				name: "",
				image: "",
			},
			input: "",
			search: {},
			theme: false,
		};
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.trySearch = this.trySearch.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.hasData = this.hasData.bind(this);
		this.clearSearchData = this.clearSearchData.bind(this);
		this.toggleTheme = this.toggleTheme.bind(this);

		this.printState = this.printState.bind(this);

		// this.clearSearchData(true);
	}
	async componentDidMount() {
		await axios({
			method: "get",
			url: "users/",
		})
			.then((res) => {
				if (res.data.boolean) {
					let { username, name, image } = res.data;
					this.setState({
						loggedInAs: {
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
		await axios({
			method: "get",
			url: "tweets/bookmarks/",
		})
			.then((res) => {
				console.log(res, "get bookmarks");
			})
			.catch((err) => console.log(err));
	}

	handleInputChange(e) {
		var input = e.target.value;
		this.setState({ input });
	}
	handleKeyUp(e) {
		if (e.key === "Enter") {
			this.trySearch();
		}
	}

	handleResults(data) {
		var search = this.state.search;
		if (data.length > 0) {
			search.results = data;
			search.resolved = true;
			this.setState(search);
		} else {
			console.log("no dataaaa");
			search.results = {};
			search.resolved = true;
			search.hasData = false;
			this.setState(search);
		}
		// this.setState(search);
	}
	hasData() {
		console.log("has dats");
		var search = this.state.search;
		return search.results !== undefined && search.results.length > 0;
	}

	clearSearchData(refresh = true) {
		console.log("clear seachw");

		var search = this.state.search;

		search.sent = false;
		search.resolved = false;
		search.interrupted = false;
		search.rawResult = {};

		if (refresh) {
			this.setState(this.state.search);
		}
	}
	async trySearch() {
		var search = this.state.search;
		var keyword = this.state.input;

		search.sent = true;
		search.resolved = false;
		this.setState(search);
		if (keyword === "") {
			console.log("nothing");
			this.setState((prevState) => ({
				...prevState,
				search: {
					...prevState.params,
					hasData: false,
				},
			}));
			return;
		}
		await axios({
			method: "get",
			url: "tweets/search/",
			params: { q: keyword },
		})
			.then((res) => {
				console.log(res.data, "dcsdcsdcsd");
				this.handleResults(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	toggleTheme() {
		console.log("yeah");
		this.setState((prevState) => ({
			theme: !prevState.theme,
		}));
	}

	printState(e) {
		e.preventDefault();
		console.log(this.state.input);
	}

	render() {
		return (
			<body data-theme={this.state.theme ? "light" : "dark"}>
				<div className="main-div" data-theme={this.state.theme ? "light" : "dark"}>
					<Header
						image={this.state.loggedInAs.image}
						name={this.state.loggedInAs.name}
						username={this.state.loggedInAs.username}
						toggle={this.toggleTheme}
					/>

					<div className="content" data-theme={this.state.theme ? "light" : "dark"}>
						<form className="search-form">
							<button className="search-bttn" onClick={this.printState}>
								<img className="search-img" src={this.state.theme ? searchGrey : searchBlue} />
							</button>
							<input
								type="search"
								className="search-bar"
								placeholder="Search Bookmarks"
								onChange={(e) => this.handleInputChange(e)}
								onKeyUp={(e) => this.handleKeyUp(e)}
							></input>
						</form>
						<ul>
							<Results
								data={this.state.search}
								hasData={this.hasData}
								theme={this.state.theme ? "light" : "dim"}
							></Results>
						</ul>
					</div>
				</div>
			</body>
		);
	}
}

const MediaItem = ({ media }) => {
	return (
		<div className="photo-grid">
			{media.map((item, index) => (
				<div className="tweet-img-container" key={index}>
					<img className="tweet-img" src={item.url} />
				</div>
			))}
		</div>
	);
};
const TweetItem = ({ data, theme }) => {
	// console.log(data, ">>>>>>>>>>>>");
	var { name, username, image } = data;

	var composer = { name, username, image };

	return (
		<div>
			<Tweet author={composer} tweet={data.text} permalink={data.url} theme={theme} />
			{data.is_media && <MediaItem media={data.media_urls} />}
		</div>
	);
};

const Results = ({ data, hasData, theme }) => {
	// console.log(data, hasData, "in results");
	if (data.sent && !data.resolved) {
		return (
			<div style={{ textAlign: "center", opacity: "0.5" }}>
				<i>Loading results...</i>
			</div>
		);
	}

	if (!data.results && !data.sent) {
		return (
			<div style={{ textAlign: "center", opacity: "0.5" }}>
				<i>Enter keyword to search .</i>
			</div>
		);
	}
	if (!hasData) {
		return (
			<div style={{ textAlign: "center", opacity: "0.5" }}>
				<i>No results found.</i>
			</div>
		);
	}
	return (
		<div>
			{data.results.map((item, index) => (
				<li key={index}>
					<TweetItem data={item} theme={theme} />
				</li>
				// <ListGroupItem disabled eventKey={index}>
				// 	<TweetItem data={item} />
				// </ListGroupItem>
			))}
		</div>
	);
};

export default Home;
