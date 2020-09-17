import { createAction } from "redux-actions";
import * as Types from "./types";

export const createProject = createAction(Types.CREATE_PROJECT);
export const createProjectSuccess = createAction(Types.CREATE_PROJECT_SUCCESS);
export const createQuestion = createAction(Types.CREATE_QUESTION);
export const createQuestionSuccess = createAction(
  Types.CREATE_QUESTION_SUCCESS
);
export const getProjects = createAction(Types.GET_PROJECTS);
export const getProjectsSuccess = createAction(Types.GET_PROJECTS_SUCCESS);
export const getProject = createAction(Types.GET_PROJECT);
export const getProjectSuccess = createAction(Types.GET_PROJECT_SUCCESS);
export const updateProject = createAction(Types.UPDATE_PROJECT);
export const updateProjectSuccess = createAction(Types.UPDATE_PROJECT_SUCCESS);
