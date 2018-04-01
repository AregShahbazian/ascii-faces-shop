import {select, all, call, fork, put, takeEvery} from "redux-saga/effects";
import {fetchData} from "../api"
import {setNextPage, getDataFromCache, setLoading, getData, cacheData, setError} from "../actions/index"
import {getCachedData, getLoading, getNextPage, getSort} from "../reducers/selectors"

function* getDataSaga(action) {
    const nextPage = yield select(getNextPage);
    const loading = yield select(getLoading);

    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)
        && !loading && nextPage) {

        yield put(setLoading(true))

        const cachedData = yield select(getCachedData)

        console.log(`Loading ${cachedData.length} cached data-rows into grid`);
        yield put(getDataFromCache(cachedData))

        const sort = yield select(getSort);

        const {response, error} = yield call(fetchData, nextPage, sort)

        if (response) {
            console.log(`Caching data from page ${nextPage} sorted by ${sort}`);
            yield put(cacheData(response.data))
            yield put(setLoading(false))
            yield put(setNextPage(response.data.length ? nextPage + 1 : undefined))
        }
        else {
            yield put(setError(error))
        }

        yield put(getData())
    }

}

export function* watchGetData() {
    yield takeEvery(getData, getDataSaga)
}

export default function* root() {
    yield all(
        [fork(watchGetData)]
    )
}