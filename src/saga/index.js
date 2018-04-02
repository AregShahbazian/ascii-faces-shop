import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {fetchData} from "../api"
import {getDataRoutine} from "../actions/index"
import {getCachedData, getNextPage, getSort} from "../reducers/selectors"

function* getDataSaga(action) {
    const nextPage = yield select(getNextPage);

    if (action.payload.needData) {
        const cachedData = yield select(getCachedData)

        console.log(`Loading ${cachedData.length} cached data-rows into grid`);
        yield put(getDataRoutine.request(cachedData))

        const sort = yield select(getSort);
        const {response, error} = yield call(fetchData, nextPage, sort)

        if (response) {
            console.log(`Caching data from page ${nextPage} sorted by ${sort}`);
            yield put(getDataRoutine.success(response.data))
        }
        else {
            yield put(getDataRoutine.failure(error))
        }

        yield put(getDataRoutine.fulfill())

        // dispatch another get-data action to load the first cache into display
        if (nextPage === 1) {
            yield put(getDataRoutine({needData: true}))
        }
    }
}

export function* watchGetDataTrigger() {
    yield takeEvery(getDataRoutine.trigger, getDataSaga)
}

export default function* root() {
    yield all(
        [fork(watchGetDataTrigger)]
    )
}