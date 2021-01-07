import { combineReducers } from "redux";
import staskState from "./staskReducer";
import authState from "./authReducer";

const rootRuducers = combineReducers({
  staskState,
  authState,
});

export default rootRuducers;
