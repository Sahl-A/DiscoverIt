import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from "../types";

const initialState = {
  loading: false,
  errors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };

    case SET_ERRORS:
      return {
        loading: false,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        errors: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
