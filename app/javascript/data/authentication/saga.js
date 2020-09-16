import { select, takeEvery } from "redux-saga/effects";
import * as Types from "./types";
import { Selectors as CurrentUserSelectors } from "../current-user";

export function* login(action) {
  yield fetch("/api/v1/logins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action.payload),
  }).then((response) => response.json());
  window.location.reload();
}

export function* logout() {
  const { id } = yield select(CurrentUserSelectors.getUser);
  yield fetch(`api/v1/logins/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
  window.location.reload();
}

export function* signup(action) {
  const { email, password, firstName, lastName } = action.payload;

  yield fetch("/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: password,
      first_name: firstName,
      last_name: lastName,
    }),
  }).then((response) => response.json());
}

export default function* () {
  yield takeEvery(Types.LOGIN, login);
  yield takeEvery(Types.LOGOUT, logout);
  yield takeEvery(Types.SIGNUP, signup);
}
