import React from "react";
//import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChatPage from "./components/ChatPage/chatPage";
import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
