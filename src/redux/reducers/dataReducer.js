import {  } from "../types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return {
        ...state,
      };
    case ' ':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer
