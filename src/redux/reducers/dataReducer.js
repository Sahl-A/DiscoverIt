import {
  GET_ALL_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  likes: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };

    case LIKE_POST:
    case UNLIKE_POST:
      const index = state.posts.findIndex(
        (item) => item._id === action.payload._id
      );
      state.posts[index] = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
