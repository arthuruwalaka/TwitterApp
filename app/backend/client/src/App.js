import React, { Component } from "react";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter, BrowserRouter as Router } from "react-router-dom";
// import myhistory from "./history/browserHistory";
import LoginComponent from "./Components/login/Login";
import Authenticate from "./Components/authenticate/Authenticate";
import Callback from "./Components/Callback/callback";
import Home from "./Components/home/Home";
import Temp from "./Components/temp/Temp";
import HTML404 from "./Components/html/404";
import LogoutComponent from "./Components/logout/logout";
import axios from "axios";
import "./App.css";
import "./App.scss";
// replace with requre login component
// let loggedIn;
// let userDetails = {};
// await axios({
// 	method: "get",
// 	url: "users/",
// })
// 	.then((res) => {
// 		console.log(res.data, "res");
// 		loggedIn = res.data.boolean;
// 		let { username, name, image } = res.data;
// 		userDetails = {
// 			username: username,
// 			name: name,
// 			image: image,
// 		};
// 	})
// 	.catch((err) => console.log(err));

// console.log(loggedIn, "logged  in as", id);
class App extends Component {
	render() {
		return (
			<div>
				{/* <HistoryRouter history={history}> */}
				<Routes>
					<Route path="/home" element={<Home />} />
					{/* remove login url */}
					<Route path="/" element={<LoginComponent />} />
					{/* <Route path="/login" element={<LoginComponent />} /> */}
					<Route path="/logout" element={<LogoutComponent />} />
					<Route path="/authenticate" element={<Authenticate />} />
					<Route path="/twitter_callback" element={<Callback />} />
					<Route path="temp" element={<Temp />} />
					<Route path="/*" element={<HTML404 />} />
				</Routes>
				{/* </HistoryRouter> */}
			</div>
		);
	}
}

export default App;
