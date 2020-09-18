import { createAction } from "redux-actions";
import * as Types from "./types";

export const getProjects = createAction(Types.GET_PROJECTS);
export const getProjectsSuccess = createAction(Types.GET_PROJECTS_SUCCESS);
