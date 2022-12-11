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
			// <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "#fafafa" }}>
			// 	<div
			// 		style={{
			// 			textAlign: "center",
			// 			fontSize: "1.25em",
			// 			width: "100%",
			// 			color: "#5e5e5e",
			// 			marginLeft: "auto",
			// 			marginRight: "auto",
			// 			marginTop: "5vh",
			// 		}}
			// 	>
			// 		<strong
			// 			style={{
			// 				color: "#2e2e2e",
			// 				fontSize: "5em",
			// 			}}
			// 		>
			// 			404
			// 		</strong>
			// 		<br></br>
			// 		<i
			// 			style={{
			// 				fontSize: "1.2em",
			// 			}}
			// 		>
			// 			Page not found
			// 		</i>
			// 		<br></br>
			// 		<a
			// 			onClick={this.returnToHome.bind(this)}
			// 			href="#"
			// 			style={{
			// 				fontSize: "0.8em",
			// 			}}
			// 		>
			// 			Return to homepage
			// 		</a>
			// 	</div>
			// 	<Divider style={{ width: "50%", marginTop: "1em", marginLeft: "auto", marginRight: "auto" }}></Divider>
			// 	{/*Oddly not centered...*/}
			// 	<FlexboxGrid justify="center" style={{ marginLeft: "3.5vh", marginTop: "10vh" }}>
			// 		<FlexboxGrid.Item colspan={0}>
			// 			<GlobalIcon style={{ color: "#2b7e53", fontSize: "50vh" }}></GlobalIcon>
			// 		</FlexboxGrid.Item>
			// 	</FlexboxGrid>
			// </div>
		);
	}
}

export default HTML404;
