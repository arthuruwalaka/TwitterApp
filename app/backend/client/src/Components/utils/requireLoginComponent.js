import history from "../../history/browserHistory";
import { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class RequireLoginComponent extends Component {
	constructor(props) {
		super(props);

		// are we logged in?

		this.componentDidMount = () => {
			console.log("coponent sidd mount");
		};

		this.render = () => {
			return (
				<div>
					<h>Redirecting...</h>
				</div>
			);
		};
	}
}
export default RequireLoginComponent;

// class RequireLoginComponent extends Component {
// 	constructor(props) {
// 		super(props);
// 		// this.state = {
// 		// 	logIn: false,
// 		// };

// 		// all checks failed, redirect back to login
// 		// axios({
// 		// 	method: "get",
// 		// 	url: "users/",
// 		// })
// 		// 	.then((res) => {
// 		// 		if (res.data.boolean) {
// 		// 			return;
// 		// 		} else {
// 		// 			this.setState({ logIn: true });
// 		// 		}
// 		// 	})
// 		// 	.catch((err) => this.setState({ logIn: true }));
// 		// let bbb = false;
// 		// // let redi = false;
// 		// if (bbb) {
// 		// 	console.log("if ff");
// 		// 	// return;
// 		// } else {
// 		// 	console.log(" else , req");
// 		// 	// this.setState({ logIn: true });
// 		// }
// 		this.componentDidMount = () => {
// 			console.log("yeah");
// 		};

// 		this.render = () => {
// 			return <div>{false && <Navigate to="/login" />}</div>;
// 		};
// 	}
// }
// export default RequireLoginComponent;
