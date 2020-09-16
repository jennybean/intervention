import { createAction } from "redux-actions";
import * as Types from "./types";

export const login = createAction(Types.LOGIN);
export const logout = createAction(Types.LOGOUT);
export const signup = createAction(Types.SIGNUP);
