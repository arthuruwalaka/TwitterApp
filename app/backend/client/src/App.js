import React, { Component } from "react";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import history from "./history/browserHistory";
import LoginComponent from "./Components/login/Login";
import Authenticate from "./Components/authenticate/Authenticate";
import Callback from "./Components/Callback/callback";
import Home from "./Components/home/Home";
import Temp from "./Components/temp/Temp";
import HTML404 from "./Components/html/404";
import "./App.css";
import "./App.scss";
import axios from "axios";
// let cookies = new Cookies();
// let id = cookies.get("id");
// let x = "2239624038";
// let loggedIn;

// // replace with requre login component
// if (id) {
// 	await axios({
// 		method: "get",
// 		url: "users/",
// 		params: { id: x },
// 	})
// 		.then((res) => {
// 			console.log(res.data, "res");
// 			loggedIn = res.data.boolean;
// 		})
// 		.catch((err) => console.log(err));
// } else {
// 	loggedIn = false;
// }

// console.log(loggedIn, "logged  in as", id);
class App extends Component {
	render() {
		return (
			<div>
				<HistoryRouter history={history}>
					<Routes>
						{/* <Route path="/" element={loggedIn ? <Home /> : <LoginComponent />} /> */}
						{/* remove login url */}
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<LoginComponent />} />
						<Route path="/authenticate" element={<Authenticate />} />
						<Route path="/users/twitter_callback" element={<Callback />} />
						<Route path="temp" element={<Temp />} />
						<Route path="/*" element={<HTML404 />} />
					</Routes>
				</HistoryRouter>
			</div>
		);
	}
}

export default App;
