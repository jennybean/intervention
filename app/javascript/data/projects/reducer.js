import { handleActions } from "redux-actions";
import * as Types from "./types";

const initialState = [];

export const loadingReducer = (state) => ({
  ...state,
});

export const successReducer = (state, action) => ({
  ...action.payload,
});

export default handleActions(
  {
    [Types.GET_PROJECTS]: loadingReducer,
    [Types.GET_PROJECTS_SUCCESS]: successReducer,
  },
  initialState
);
