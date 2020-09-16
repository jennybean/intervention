import { createAction } from "redux-actions";
import * as Types from "./types";

export const getUser = createAction(Types.GET_USER);
export const getUserSuccess = createAction(Types.GET_USER_SUCCESS);
