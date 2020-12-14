import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
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

// Signup User
export const signup = (userData, history) => {
  return async (dispatch) => {
    // Set the loading to true
    dispatch({ type: LOADING_UI });
    try {
      // Send the credentials & get the token then store it in localStorage
      const signup = await axios.post("/signup", userData);
      const token = `Bearer ${signup.data.token}`;
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
    dispatch({ type: LOADING_USER });
    try {
      const user = await axios.get("/user");
      dispatch({ type: SET_USER, payload: user.data });
    } catch (err) {
      console.error(err);
    }
  };
};

// Upload the profile pic
export const uploadProfilePic = (profilePic) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_USER });
    try {
      await axios.post("/user/image", profilePic);
      dispatch(getUserData());
    } catch (err) {
      console.error(err);
    }
  };
};

// Edit user details
export const editUserDetails = (userDetails) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_USER });
    try {
      await axios.post("/user", userDetails);
      await dispatch(getUserData());
    } catch (err) {
      console.error(err);
    }
  };
};
