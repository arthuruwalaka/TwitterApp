import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import "./home.scss";
import search from "../images/search.svg";
import Header from "../header/Header";
import Tweet from "../tweet/Tweet";

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
		};
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.trySearch = this.trySearch.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.hasData = this.hasData.bind(this);
		this.clearSearchData = this.clearSearchData.bind(this);

		this.printState = this.printState.bind(this);

		// this.clearSearchData(true);
	}
	async componentDidMount() {
		await axios({
			method: "get",
			url: "users/",
			params: { id: 12 },
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
			search.results = {};
			search.resolved = true;
		}
		this.setState(search);
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
		await axios({
			method: "get",
			url: "tweets/search/",
			params: { q: keyword },
		})
			.then((res) => {
				this.handleResults(res.data);
			})
			.catch((err) => {
				console.log(err);
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
					<ListGroup style={{ backgroundColor: "yellow" }}>
						<Results data={this.state.search} hasData={this.hasData()}></Results>
					</ListGroup>
				</div>
			</div>
		);
	}
}

const TweetItem = ({ data }) => {
	console.log(data, ">>>>>>>>>>>>");
	var { name, username, image } = data;

	var composer = { name, username, image };
	console.log(composer, "composer");
	return <Tweet author={composer} tweet={data.text} permalink={data.url} />;
};

const Results = ({ data, hasData }) => {
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
				<ListGroupItem eventKey={index}>
					<TweetItem data={item} />
				</ListGroupItem>
			))}
		</div>
	);
};

export default Home;
