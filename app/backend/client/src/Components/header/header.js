import React, { Component } from "react";
import "./header.scss";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";

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
					<div className="profile-div" onClick={this.props.logout}>
						<img className="profile-img" src={this.props.image} />
						<div className="name-div">
							<p className="name">{this.props.name}</p>
							<p className="username">@{this.props.username}</p>
						</div>
					</div>

					<div className="toggle-box">
						<input type="checkbox" className="checkbox" id="checkbox" onChange={this.props.toggle} />
						<label for="checkbox" className="checkbox-label">
							<BsLightbulbFill color="#FFCC33" />
							<BsLightbulbOffFill color="grey" />

							<span className="ball"></span>
						</label>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
