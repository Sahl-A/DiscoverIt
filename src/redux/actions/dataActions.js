import { GET_ALL_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from "../types";
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
      console.log(post.data, "inside likeUnlike in dataActionsssssssss");
      if(type === 'like') await dispatch({ type: LIKE_POST, payload: post.data });
      if(type=== 'unlike') await dispatch({type: UNLIKE_POST, payload: post.data})
    } catch (err) {
      console.error(err);
    }
  };
};
