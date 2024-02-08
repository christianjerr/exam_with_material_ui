import { put, call, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as actions from "./actions";
import * as models from "./models";
import { SagaIterator } from "redux-saga";
import { getType } from "typesafe-actions";
import * as bffEndPoints from "../bffEndpoints";

function* getInitial(
  action: ReturnType<typeof actions.getItem.request>
): SagaIterator {
  try {
    const response: AxiosResponse<models.ItemRes> = yield call(
      axios.get,
      bffEndPoints.cb100,
      action.payload
    );
    yield put(actions.getItem.success(response.data));
  } catch (error: any) {
    yield put(actions.getItem.failure(error));
  }
}

export function* watchSagas() {
  yield takeLatest(getType(actions.getItem.request), getInitial);
}
