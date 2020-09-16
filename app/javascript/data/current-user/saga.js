import { put, takeEvery } from "redux-saga/effects";
import * as Types from "./types";
import * as Actions from "./actions";

export function* getUser(action) {
  const { id } = action.payload;
  const data = yield fetch(`api/v1/users/${id}`).then((response) =>
    response.json()
  );
  yield put(Actions.getUserSuccess(data));
}

export default function* () {
  yield takeEvery(Types.GET_USER, getUser);
}
