/*
 * This component is the 404 page, if a route is not found this component is rendered
 */
import React, { Component } from "react";
import "./404.css";

class HTML404 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.state,
		};
	}

	render() {
		return (
			<div id="main">
				<div class="fof">
					<h1>Error 404</h1>
				</div>
			</div>
		);
	}
}

export default HTML404;
