import { put, takeEvery } from "redux-saga/effects";
import * as Actions from "./actions";
import * as Types from "./types";
import { Actions as ProjectActions } from "../project";

export function* getProjects() {
  const data = yield fetch("/api/v1/projects").then((response) =>
    response.json()
  );

  // GET first project
  if (data.length) {
    yield put(ProjectActions.getProject({ id: data[0].id }));
  }
  yield put(Actions.getProjectsSuccess(data));
}

export default function* () {
  yield takeEvery(Types.GET_PROJECTS, getProjects);
}
