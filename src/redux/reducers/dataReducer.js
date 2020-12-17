import {
  GET_ALL_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  POST_POST,
  GET_ONE_POST,
  ADD_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
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
      const newPosts = [...state.posts];
      newPosts[index] = action.payload;
      // Change the likeCount in post if we opened it
      if (state.post?._id === action.payload._id) {
        return {
          ...state,
          posts: [...newPosts],
          post: { ...state.post, likeCount: action.payload.likeCount },
        };
      }
      return {
        ...state,
        posts: [...newPosts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case POST_POST:
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
    case GET_ONE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
};

export default reducer;
