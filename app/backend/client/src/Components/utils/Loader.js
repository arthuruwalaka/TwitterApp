import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../images/twitter-bird.json";

class Loader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (true) {
			return (
				<div
					style={{
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						top: "0",
						left: "0",
						background: "rgba(0,0,0,0.5)",
						height: "100%",
						width: "100%",
						zIndex: "999",
					}}
				>
					<Lottie options={defaultOptions} height={"5.5em"} width={"5.5em"} speed={100} isClickToPauseDisabled />
				</div>
			);
		}
	}
}
const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};
export default Loader;
