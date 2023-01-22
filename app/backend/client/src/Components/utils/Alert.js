import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import searchBlue from "../images/search-blue.svg";
import searchGrey from "../images/search-grey.svg";

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Toast className="d-inline-block m-1" bg={variant.toLowerCase()} key={idx}>
				<Toast.Header>
					<img src={searchBlue} className="rounded me-2" alt="" />
					<strong className="me-auto">Search Bookmarks</strong>
				</Toast.Header>
				<Toast.Body className={variant === "Dark" && "text-white"}>Hello, world! This is a toast message.</Toast.Body>
			</Toast>
		);
	}
}
