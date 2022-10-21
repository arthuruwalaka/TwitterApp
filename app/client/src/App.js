import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginComponent from "./Components/login/login"
import Home from "./Components/home/home"
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element ={<LoginComponent />} />
            <Route path="/home" element={<Home />}/>
          </Routes>
			  </BrowserRouter>
      </div>
      
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
