import {
  GET_ALL_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  SET_POST,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../types";
import axios from "axios";

// Get all the posts
export const getAllPosts = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    try {
      const postsData = await axios.get("/screams");
      await dispatch({ type: GET_ALL_POSTS, payload: postsData.data.screams });
    } catch (err) {
      console.error(err);
      await dispatch({ type: GET_ALL_POSTS, payload: [] });
    }
  };
};

// Like/unLike a post
export const likeUnlike = (postId, type) => {
  return async (dispatch) => {
    try {
      const post = await axios.get(`/scream/${postId}/like-unlike`);
      if (type === "like")
        await dispatch({ type: LIKE_POST, payload: post.data });
      if (type === "unlike")
        await dispatch({ type: UNLIKE_POST, payload: post.data });
    } catch (err) {
      console.error(err);
    }
  };
};

// When deleting a post
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_POST, payload: postId });
      await axios.delete(`/scream/${postId}`);
    } catch (err) {
      console.error(err);
    }
  };
};

// When Posting a post
export const postPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
      const postRawData = await axios.post("/scream", post);
      dispatch({ type: SET_POST, payload: postRawData.data.data});
      dispatch({ type: CLEAR_ERRORS });
    } catch (err) {
      dispatch({ type: SET_ERRORS });
      console.error(err);
    }
  };
};
