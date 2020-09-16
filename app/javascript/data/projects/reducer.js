import { handleActions } from "redux-actions";
import * as Types from "./types";

const initialState = {};

export const loadingReducer = (state) => ({
  ...state,
});

export const successReducer = (state, action) => ({
  ...action.payload,
});

export default handleActions(
  {
    [Types.CREATE_PROJECT]: loadingReducer,
    [Types.CREATE_PROJECT_SUCCESS]: successReducer,
    [Types.CREATE_QUESTION]: loadingReducer,
    [Types.CREATE_QUESTION_SUCCESS]: successReducer,
  },
  initialState
);
