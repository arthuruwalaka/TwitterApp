import React, { Component } from "react";
import { Container } from "rsuite";

import "./temp.scss";

import Tweet from "../tweet/Tweet";
class Temp extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			// <Container style={{ backgroundColor: "yellow", height: "100vh" }}>
			// 	<Tweet
			// 		author={{
			// 			name: "randy",
			// 			username: "randyfactory",
			// 			image: "http://placekitten.com/200/300",
			// 		}}
			// 		tweet={`how was “philosopher” ever a job lmao like was socrates sippin wine on a balcony somewhere drunkenly slurring shit like “to find urself, think for urself” with a crowd cheering underneath him like fuck yes socrates another banger this man will not miss`}
			// 		time={new Date(2021, 2, 2, 21, 3)}
			// 		source="Twitter for iPhone"
			// 		permalink="https://twitter.com/randyfactory/status/1366841622495961091" // optional
			// 		fitInsideContainer
			// 	/>
			// </Container>

			<div className="photo-grid">
				{/* <div>1</div>
					<div>2</div>
					<div style={{ backgroundColor: "yellow" }}>3</div> */}

				<div className="tweet-img-container">
					<img className="tweet-img" src="https://placekitten.com/200/300" />
				</div>
				<div className="tweet-img-container">
					<img className="tweet-img" src="https://placekitten.com/200/300" />
				</div>
				<div className="tweet-img-container">
					<img className="tweet-img" src="https://placekitten.com/200/300" />
				</div>
				<div className="tweet-img-container">
					<img className="tweet-img" src="https://placekitten.com/200/300" />
				</div>
			</div>
		);
	}
}
export default Temp;
