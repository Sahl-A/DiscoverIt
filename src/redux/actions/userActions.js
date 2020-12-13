import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from "../types";
import axios from "axios";

// Login User
export const loginUser = (userData, history) => {
  return async (dispatch) => {
    // Set the loading to true
    dispatch({ type: LOADING_UI });

    try {
      // Send the credentials & get the token then store it in localStorage
      const login = await axios.post("/login", userData);
      const token = `Bearer ${login.data.token}`;
      localStorage.setItem("DiscoverItToken", token);
      // Get the user data when he is logged
      await dispatch(getUserData());
      // Clear errors
      dispatch({ type: CLEAR_ERRORS });
      // Save the token in axios defaults to use it later
      axios.defaults.headers.common["Authorization"] = token;
      // Redirect to homepage
      history.push("/");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response?.data,
      });
    }
  };
};

// Signup User
export const signup = (userData, history) => {
  return async (dispatch) => {
    // Set the loading to true
    dispatch({ type: LOADING_UI });
    console.log("[userAction] after dispatch LOADING_UI");

    try {
      console.log("[userAction] before send /signup");
      // Send the credentials & get the token then store it in localStorage
      const login = await axios.post("/signup", userData);
      console.log("[userAction] after dispatch send /signup");
      const token = `Bearer ${login.data.token}`;
      localStorage.setItem("DiscoverItToken", token);
      // Save the token in axios defaults to use it later
      axios.defaults.headers.common["Authorization"] = token;
      // Get the user data when he is logged
      await dispatch(getUserData());
      // Clear errors
      dispatch({ type: CLEAR_ERRORS });
      // Redirect to homepage
      history.push("/");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response?.data,
      });
    }
  };
};

// Logout user
export const logoutUser = (history) => {
  return async (dispatch) => {
    localStorage.removeItem("DiscoverItToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
    history.push("/login");
  };
};

// Get User Data once the user is logged
export const getUserData = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get("/user");
      dispatch({ type: SET_USER, payload: user.data });
    } catch (err) {
      console.log(err);
    }
  };
};
