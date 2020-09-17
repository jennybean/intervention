import { put, takeEvery } from "redux-saga/effects";
import * as Types from "./types";
import * as Actions from "./actions";

export function* getUsers() {
  const data = yield fetch(`/api/v1/users`).then((response) => response.json());
  yield put(Actions.getUsersSuccess(data));
}

export default function* () {
  yield takeEvery(Types.GET_USERS, getUsers);
}
