import { combineReducers } from "redux";
import {
  staskLocalReducer as staskLocalState,
  staskFirebaseReducer as staskFirebaseState,
} from "./staskReducer";
import authState from "./authReducer";

const rootRuducers = combineReducers({
  staskLocalState,
  staskFirebaseState,
  authState,
});

export default rootRuducers;
