import React from "react";
import "./App.css";

// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth='md'>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
