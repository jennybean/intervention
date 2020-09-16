import { put, select, takeEvery } from "redux-saga/effects";
import * as Types from "./types";
import * as Actions from "./actions";
import { Selectors as CurrentUserSelectors } from "../current-user";

export function* createProject(action) {
  const { name, questions } = action.payload;
  const { id } = yield select(CurrentUserSelectors.getUser);

  const data = yield fetch("/api/v1/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      team_lead_user_ids: [id],
    }),
  }).then((response) => response.json());
  yield put(Actions.createQuestion({ id: data.id, questions }));
}

export function* createQuestion(action) {
  const { id, questions } = action.payload;

  const data = yield fetch("/api/v1/project_questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: id,
      question_text: questions,
    }),
  }).then((response) => response.json());
}

export default function* () {
  yield takeEvery(Types.CREATE_PROJECT, createProject);
  yield takeEvery(Types.CREATE_QUESTION, createQuestion);
}
