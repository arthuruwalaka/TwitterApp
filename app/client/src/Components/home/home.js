import React, { Component } from "react";
import axios from "axios";
import history from "../../history/browserHistory";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInAs: "",
		};
	}

	// componentDidMount() {
	// 	console.log("hey", history.location.state.loggedInAs);
	// 	this.setState({ loggedInAs: history.location.state.loggedInAs });
	// 	console.log("testing logged ins as in homw", this.state.loggedInAs);
	// }
	render() {
		return (
			<div>
				<img src="http://placekitten.com/g/200/300"></img>
			</div>
		);
	}
}
export default Home;
