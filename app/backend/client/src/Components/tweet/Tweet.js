import React, { Component } from "react";
import TweetCard from "react-tweet-card";
import "./tweet.scss";

// individual tweet card
class Tweet extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TweetCard
				author={this.props.author}
				tweet={this.props.tweet}
				permalink={this.props.permalink} // optional
				fitInsideContainer
				clickableProfileLink
				theme={this.props.theme}
				showDetails={false}
			/>
		);
	}
}

export default Tweet;
