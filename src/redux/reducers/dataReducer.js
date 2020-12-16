import {
  GET_ALL_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_POST,
} from "../types";

const initialState = {
  posts: [],
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case SET_POST:
      return {
        ...state,
        posts: [
          {
            body: action.payload.body,
            userHandle: action.payload.userHandle,
            userImage: action.payload.userImage,
            commnetCount: action.payload.commnetCount,
            likeCount: action.payload.likeCount,
          },
          ...state.posts,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
