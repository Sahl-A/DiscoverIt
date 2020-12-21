import React from "react";
import "./App.css";

// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

// MUI
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "./redux/types";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import signup from "./pages/signup";
import user from './pages/user';

// Components
import Navbar from "./components/layout/Navbar";

// HOC
import AuthRoute from "./utils/authRoute";

axios.defaults.baseURL = "http://localhost:8080/api";

// Get the token from localStorage, decode it
// compare it with time now to know its expiration
const token = localStorage.DiscoverItToken?.split(" ")[1];
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch({ type: SET_UNAUTHENTICATED });
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = localStorage.DiscoverItToken;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container className='appContainer'>
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
