import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

// Combine all reducers
const reducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  UI: uiReducer,
});

// To enable the redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store
export default createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
