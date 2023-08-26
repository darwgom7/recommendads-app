import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Ad from "./components/Ad";
import "./App.css";

const App = () => {
  const storedToken = localStorage.getItem("authToken");
  const [token, setToken] = useState(storedToken || "");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  return (
    <Router>
      <div className="App">
        <header className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/ads">
              <img src="/recommendad.png" alt="Anuncios Logo" width="40" height="40" />
              <span className="App-title">RecommendAds</span> 
            </Link>
            {token && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </header>
        <Switch>
          <Route exact path="/login">
            {token ? <Redirect to="/ads" /> : <Login setToken={setToken} />}
          </Route>
          <Route exact path="/ads">
            {token ? <Ad token={token} /> : <Redirect to="/login" />}
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
