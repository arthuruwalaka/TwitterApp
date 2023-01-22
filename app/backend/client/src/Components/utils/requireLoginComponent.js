import history from "../../history/browserHistory";
import { Component } from "react";

// await axios({
// 	method: "get",
// 	url: "users/",
// })
// 	.then((res) => {
// 		if (res.data.boolean) {
// 			console.log("kkkkkk");
// 			return;
// 		} else {
// 			console.log("user not logged in ");
// 		}
// 	})
// 	.catch((err) => console.log(err));
class RequireLoginComponent extends Component {
	constructor(props) {
		super(props);

		// all checks failed, redirect back to login
		let bbb = false;
		if (bbb) {
			return;
		} else {
			history.push("/login");
		}
		this.componentDidMount = () => {
			console.log("yeah");
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
