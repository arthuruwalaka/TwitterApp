import React, { Component } from "react";
import {
	Route,
	Routes,
	unstable_HistoryRouter as HistoryRouter,
	BrowserRouter as Router,
	Navigate,
} from "react-router-dom";
import LoginComponent from "./Components/login/Login";
import Authenticate from "./Components/authenticate/Authenticate";
import Callback from "./Components/Callback/callback";
import Home from "./Components/home/Home";
import HTML404 from "./Components/html/404";
import LogoutComponent from "./Components/logout/logout";
import axios from "axios";
import "./App.css";
import "./App.scss";
class App extends Component {
	render() {
		return (
			<div>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<LoginComponent />} />
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/logout" element={<LogoutComponent />} />
					<Route path="/authenticate" element={<Authenticate />} />
					<Route path="/twitter_callback" element={<Callback />} />
					<Route path="/*" element={<HTML404 />} />
				</Routes>
			</div>
		);
	}
}

export default App;
