import { createAction } from "redux-actions";
import * as Types from "./types";

export const createProject = createAction(Types.CREATE_PROJECT);
export const createProjectSuccess = createAction(Types.CREATE_PROJECT_SUCCESS);
export const createQuestion = createAction(Types.CREATE_QUESTION);
export const createQuestionSuccess = createAction(
  Types.CREATE_QUESTION_SUCCESS
);
