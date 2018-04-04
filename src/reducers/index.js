import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import update from "immutability-helper";
import {getDataRoutine, setLastAdNo, setSortRoutine} from "../actions/index";

export const products = handleActions({
    /* GET_DATA routine reducers */
    [getDataRoutine.REQUEST]
        (state, action) {
        return update(state, {
            loading: {$set: true},
            data: {$push: action.payload.cachedData},
            dataCached: {$set: []}
        });
    },
    [getDataRoutine.SUCCESS]
        (state, action) {
        return update(state, {
            dataCached: {$set: action.payload.data},
            nextPage: {$set: action.payload.data.length ? state.nextPage + 1 : undefined}
        });
    },
    [getDataRoutine.FAILURE]
        (state, action) {
        return update(state, {
            error: {$set: action.payload.error},
        });
    },
    [getDataRoutine.FULFILL]
        (state, action) {
        return update(state, {
            loading: {$set: false},
        });
    },
    /* SET_SORT routine reducers */
    [setSortRoutine.SUCCESS]
        (state, action) {
        return update(state, {
            data: {$set: []},
            dataCached: {$set: []},
            nextPage: {$set: 1},
            sort: {$set: action.payload.sort}
        });
    },
    /* SET_LAST_AD action reducers */
    [setLastAdNo]
        (state, action) {
        return update(state, {
            lastAdNo: {$set: action.payload.lastAdNo}
        });
    }
}, {
    data: [],
    dataCached: [],
    loading: false,
    nextPage: 1,
    sort: "id",
    lastAdNo: undefined,
    error: undefined
});

export default combineReducers({
    products
})