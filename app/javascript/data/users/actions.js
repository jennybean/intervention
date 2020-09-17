import { createAction } from "redux-actions";
import * as Types from "./types";

export const getUsers = createAction(Types.GET_USERS);
export const getUsersSuccess = createAction(Types.GET_USERS_SUCCESS);
