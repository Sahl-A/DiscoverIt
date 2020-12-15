import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: [],
  likes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload._id,
          },
        ],
      };

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
