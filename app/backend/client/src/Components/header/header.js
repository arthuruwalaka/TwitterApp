import React, { Component } from "react";
import "./header.scss";
import history from "../../history/browserHistory";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Bookmark from "../images/bookmark.svg";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.setState({ image: this.props.image });
	}

	render() {
		return (
			<div>
				<nav className="header">
					<div className="profile-div">
						<img className="profile-img" src={this.props.image} />
						<div className="name-div">
							<p className="name">{this.props.name}</p>
							<p className="username">@{this.props.username}</p>
						</div>
					</div>

					<button className="logout-bttn">Logout</button>
				</nav>
			</div>
		);
	}
}

export default Header;
