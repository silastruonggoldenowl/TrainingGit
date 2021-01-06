import { combineReducers } from "redux";
import staskState from "./staskReducer";

const rootRuducers = combineReducers({
  staskState,
});

export default rootRuducers;
