import React, { Component } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ToastContainer position={"bottom-center"} style={{ padding: "1em" }}>
				<Toast
					key={1}
					bg={this.props.bg}
					onClose={this.props.closeToast}
					show={this.props.showToast}
					delay={3000}
					autohide
				>
					<Toast.Body>{this.props.message}</Toast.Body>
				</Toast>
			</ToastContainer>
		);
	}
}
export default Alert;
