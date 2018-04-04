import {all, call, fork, put, select, take, takeEvery, takeLatest} from "redux-saga/effects";
import {fetchData} from "../api";
import {getDataRoutine, setSortRoutine} from "../actions/index";
import {getCachedData, getNextPage, getSort} from "../reducers/selectors";

function* getDataSaga(action) {
    if (action.type === setSortRoutine.TRIGGER) {
        /* Using routines seems a bit overkill here, but it's still more concise than having a "change-sort" action to
       * trigger the saga and a "set-sort" action for the reducer to change the sort in the state
       */
        yield put(setSortRoutine.success({
            sort: action.payload.sort
        }))
    }

    const nextPage = yield select(getNextPage);

    if (action.payload.needData || action.type === setSortRoutine.TRIGGER) {
        const cachedData = yield select(getCachedData)

        console.log(`Loading ${cachedData.length} cached data-rows into grid`);
        yield put(getDataRoutine.request({cachedData}))

        const sort = yield select(getSort);
        const {response, error} = yield call(fetchData, nextPage, sort)

        if (response) {
            console.log(`Storing data from page ${nextPage} sorted by ${sort} in cache`);
            yield put(getDataRoutine.success({data: response.data}))
        }
        else {
            console.error(error)
            yield put(getDataRoutine.failure({error}))
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

/**
 * Watching the SET_SORT action with "takeLatest" makes sure that any previous instance of the saga task is automatically
 * cancelled if it's still running. This assures that no concurrent forks of the same task are running and prevents
 * incorrect sorting of data
 * */
export function* watchSetSortTrigger() {
    yield takeLatest(setSortRoutine.trigger, getDataSaga)
}

export default function* root() {
    yield all([
        fork(watchGetDataTrigger),
        fork(watchSetSortTrigger)]
    )
}
