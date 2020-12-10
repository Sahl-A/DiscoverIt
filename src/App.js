import React from "react";
import axios from 'axios'
import "./App.css";

// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './theme';

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";


axios.defaults.baseURL = 'http://localhost:8080/api';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Container style={{marginTop: '2rem'}} >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
