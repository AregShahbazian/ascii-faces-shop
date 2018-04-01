import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import fetchData from "../api"
import {LOADING} from "../actions/index"

function* loadData(action) {
    

    // yield put(LOADING(true))

    // yield call(fetchData, action.page, action.sort)
}

export function* watchLoadData() {
    yield takeLatest("LOAD_DATA", loadData)
}

export default function* root() {

    yield all(
        [fork(watchLoadData)]
    )
}