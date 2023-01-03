import React, { Component } from "react";
import { Fade } from "react-bootstrap";

import TweetCard from "react-tweet-card";

class Tweet extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TweetCard
				author={{
					name: "randy",
					username: "randyfactory",
					image: "https://pbs.twimg.com/profile_images/1382083582752096262/xrx0PO8Z_400x400.jpg",
				}}
				tweet={`how was “philosopher” ever a job lmao like was socrates sippin wine on a balcony somewhere drunkenly slurring shit like “to find urself, think for urself” with a crowd cheering underneath him like fuck yes socrates another banger this man will not miss`}
				time={"Go to tweet"}
				// source="Twitter for iPhone"
				permalink="https://twitter.com/randyfactory/status/1366841622495961091" // optional
				fitInsideContainer
				clickableProfileLink
			/>
		);
	}
}

export default Tweet;
