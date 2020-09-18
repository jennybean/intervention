import { put, select, takeEvery } from "redux-saga/effects";
import * as Types from "./types";
import * as Actions from "./actions";
import { Selectors as CurrentUserSelectors } from "../current-user";

export function* createProject(action) {
  const { name, members, questions } = action.payload;
  const { id } = yield select(CurrentUserSelectors.getUser);

  const data = yield fetch("/api/v1/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      team_lead_user_ids: [id],
      team_member_user_ids: members,
    }),
  }).then((response) => response.json());
  yield put(Actions.createQuestion({ id: data.id, questions }));
}

export function* createQuestion(action) {
  const { id, questions } = action.payload;

  yield fetch("/api/v1/project_questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: id,
      question_text: questions,
    }),
  }).then((response) => response.json());
}

export function* getProject(action) {
  const { id } = action.payload;
  const data = yield fetch(`/api/v1/projects/${id}`).then((response) =>
    response.json()
  );
  const questions = yield fetch("/api/v1/questions_by_project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: id,
    }),
  }).then((response) => response.json());
  yield put(Actions.getProjectSuccess({ ...data, questions }));
}

// Update Existing Project:
// PUT to localhost:3000/api/v1/projects/ID
// params: { "name": "cool project name", "team_lead_user_ids": [1, 2], "team_member_user_ids": [3,4,5,6,7,8,9,10]}
export function* updateProject(action) {
  const { id, name, members } = action.payload;

  yield fetch(`/api/v1/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      team_member_user_ids: members,
    }),
  }).then((response) => response.json());
}

// Update a question
// PUT to localhost:3000/api/v1/project_questions/ID
// params: { "project_id": 1, "question_text": "Team morale is low. We all need a day off.", "yes_votes": [1,2,3,7,8,9], "no_votes": [4,5,6]}
// For the Admin "clear all answers" functionality, simply send this back with empty arrays for "yes_votes" and "no_votes"

export function* updateVote(action) {
  const { id, yesVotes, noVotes } = action.payload;
  yield fetch(`/api/v1/project_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      yes_votes: yesVotes,
      no_votes: noVotes,
    }),
  }).then((response) => response.json());
}

export default function* () {
  yield takeEvery(Types.CREATE_PROJECT, createProject);
  yield takeEvery(Types.CREATE_QUESTION, createQuestion);
  yield takeEvery(Types.GET_PROJECT, getProject);
  yield takeEvery(Types.UPDATE_PROJECT, updateProject);
  yield takeEvery(Types.UPDATE_VOTE, updateVote);
}
