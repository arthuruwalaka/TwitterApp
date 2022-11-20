import React, { Component } from "react";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import history from "./history/browserHistory";
import LoginComponent from "./Components/login/login";
import Authenticate from "./Components/authenticate/authenticate";
import Callback from "./Components/Callback/callback";
import Home from "./Components/home/home";
import "./App.css";
import axios from "axios";

const authenticated = await this.isAuthenticated();
console.log(authenticated);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cookies = new Cookies();
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	async isAuthenticated() {
		let x = this.cookies.get("id");
		let authenticated = false;
		if (x) {
			await axios({
				method: "get",
				url: "/users",
				params: { id: x },
			}).then((res) => {
				console.log(res.data, "vkmksdc", x);
				authenticated = true;
			});
		} else {
			console.log(false);
			authenticated = false;
		}
		return authenticated;
	}

	// console.log("yh", x);
	// return this.cookies.get("id");
	render() {
		console.log("bciuucnic", this.isAuthenticated());
		return (
			<div>
				<HistoryRouter history={history}>
					<Routes>
						{/* <Route path="/login" element={<LoginComponent />} /> */}
						<Route path="/authenticate" element={<Authenticate />} />
						<Route path="/users/twitter_callback" element={<Callback />} />
						{/* <Route path="/" element={() => (false ? <LoginComponent /> : <LoginComponent />)} /> */}
						<Route path="/" element={this.isAuthenticated() ? <Home /> : <LoginComponent />} />
					</Routes>
				</HistoryRouter>
			</div>
		);
	}
}

export default App;
