import { combineReducers } from "redux";
import currentUserReducer from "../data/current-user/reducer";
import projectsReducer from "../data/projects/reducer";
import usersReducer from "../data/users/reducer";

export default combineReducers({
  currentUser: currentUserReducer,
  projects: projectsReducer,
  users: usersReducer,
});
