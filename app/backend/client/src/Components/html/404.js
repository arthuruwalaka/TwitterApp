/*
 * This component is the 404 page, if a route is not found this component is rendered
 */
import React, { Component } from "react";
import "./404.css";
// import { FlexboxGrid, Divider } from "rsuite";
// // import "./startPage.css";
// import history from "../../history";
// import GlobalIcon from "@rsuite/icons/Global";

class HTML404 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.state,
		};
	}

	// returnToHome() {
	// 	history.push({
	// 		pathname: "/",
	// 		state: {
	// 			data: this.state.data,
	// 		},
	// 	});
	// }

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
