import React, { Component } from "react";
import { Fade } from "react-bootstrap";

import TweetCard from "react-tweet-card";

class Tweet extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		{
			// console.log("tweet card", this.props.author, this.props.permalink, this.props.tweet);
		}
		return (
			<TweetCard
				author={this.props.author}
				tweet={this.props.tweet}
				time={"Go to tweet"}
				permalink={this.props.permalink} // optional
				fitInsideContainer
				clickableProfileLink
			/>
		);
	}
}

export default Tweet;
