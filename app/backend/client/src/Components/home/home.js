import React, { Component } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./home.scss";
import "../../index.css";
import searchBlue from "../images/search-blue.svg";
import searchGrey from "../images/search-grey.svg";
import Alert from "../utils/Alert";
import Header from "../header/Header";
import Loader from "../utils/Loader";
import Tweet from "../tweet/Tweet";
import RequireLoginComponent from "../utils/requireLoginComponent";

class Home extends Component {
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
			logout: false,
			goBack: false,
			isLoading: true,
			showToast: false,
		};
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.trySearch = this.trySearch.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.hasData = this.hasData.bind(this);
		this.clearSearchData = this.clearSearchData.bind(this);
		this.toggleTheme = this.toggleTheme.bind(this);
		this.logoutBox = this.logoutBox.bind(this);
		this.goToTweet = this.goToTweet.bind(this);
		this.closeToast = this.closeToast.bind(this);

		this.printState = this.printState.bind(this);
		console.log(sessionStorage.getItem("loginSuccess"), "initiall", this.state.showToast);
		// this.clearSearchData(true);
	}
	async componentDidMount() {
		if (sessionStorage.getItem("loginSuccess") === "0") {
			console.log("this is zerooo");
		}
		sessionStorage.setItem("loginSuccess", "0");
		await axios({
			method: "get",
			url: "users/",
		})
			.then((res) => {
				console.log(res.data, "res in home");
				if (res.data.boolean) {
					let loggedIn = res.data.boolean;
					let goBack = !loggedIn;
					let { username, name, image } = res.data;
					let loggedInAs = {
						username: username,
						name: name,
						image: image,
					};
					this.setState({ goBack, loggedInAs });
					this.setState({ isLoading: false });
				} else {
					console.log("you are logged out");
					this.setState({ isLoading: false, goBack: true });
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

	logoutBox() {
		this.setState({ logout: true });
	}
	printState(e) {
		e.preventDefault();
		console.log(this.state.input);
	}
	goToTweet(tweet) {
		window.open(tweet);
	}
	closeToast() {
		console.log("close toast");
		sessionStorage.setItem("loginSuccess", "0");
		this.setState({ showToast: false });
		console.log(sessionStorage.getItem("loginSuccess"));
	}

	render() {
		if (this.state.isLoading) {
			return <Loader />;
		}
		if (this.state.goBack) {
			return (
				<div>
					<Loader />
					<Navigate to="/login" replace={true} />
				</div>
			);
		}
		return (
			<body data-theme={this.state.theme ? "light" : "dark"}>
				<div className="main-div" data-theme={this.state.theme ? "light" : "dark"}>
					{this.state.logout && <Navigate to="/logout" />}
					<Header
						image={this.state.loggedInAs.image}
						name={this.state.loggedInAs.name}
						username={this.state.loggedInAs.username}
						toggle={this.toggleTheme}
						logout={this.logoutBox}
					/>

					<div className="content" data-theme={this.state.theme ? "light" : "dark"}>
						<form className="search-form">
							<button className="search-bttn" onClick={this.printState}></button>
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
								goToTweet={this.goToTweet}
							></Results>
						</ul>
					</div>
				</div>
				<Alert
					bg="success"
					closeToast={this.closeToast}
					showToast={this.state.showToast}
					message="Succesful Login!"
				></Alert>
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
		<div className="tweet-box">
			<Tweet author={composer} tweet={data.text} permalink={data.url} theme={theme} />
			{data.is_media && <MediaItem media={data.media_urls} />}
		</div>
	);
};

const Results = ({ data, hasData, theme, goToTweet }) => {
	// console.log(data, hasData, "in results");
	if (data.sent && !data.resolved) {
		return (
			<div className="result-status">
				<Spinner animation="border" variant="primary" size="sm" />
			</div>
			// <div className="result-status">
			// 	<i>Loading results...</i>
			// </div>
		);
	}

	if (!data.results && !data.sent) {
		return (
			<div className="result-status">
				<i>Enter keyword to search .</i>
			</div>
		);
	}
	if (!hasData()) {
		return (
			<div className="result-status">
				<i>No results found.</i>
			</div>
		);
	}
	return (
		<div>
			{data.results.map((item, index) => (
				<li key={index} onClick={() => goToTweet(item.url)}>
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
