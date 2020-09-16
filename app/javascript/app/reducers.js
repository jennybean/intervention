import { combineReducers } from "redux";
import currentUserReducer from "../data/current-user/reducer";

export default combineReducers({
  currentUser: currentUserReducer,
});
