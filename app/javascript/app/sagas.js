import { all, fork } from "redux-saga/effects";
import authenticationSaga from "../data/authentication/saga";
import currentUserSaga from "../data/current-user/saga";
import projectsSaga from "../data/projects/saga";
import usersSaga from "../data/users/saga";

export default function* () {
  yield all([
    fork(authenticationSaga),
    fork(currentUserSaga),
    fork(projectsSaga),
    fork(usersSaga),
  ]);
}
