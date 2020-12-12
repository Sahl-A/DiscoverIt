import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./App.css";

// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";

// HOC
import AuthRoute from "./utils/authRoute";

axios.defaults.baseURL = "http://localhost:8080/api";

// Get the token from localStorage, decode it
// compare it with time now to know its expiration
let authenticated;
const token = localStorage.DiscoverItToken.split(' ')[1];
if (token) {
  const decodedTokne = jwtDecode(token);
  if (decodedTokne.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container style={{ marginTop: "2rem" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
