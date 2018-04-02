import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import update from "immutability-helper"
import {getDataRoutine} from "../actions/index"

const DEFAULT_STATE = {
    data: [],
    dataCached: [],
    loading: false,
    nextPage: 1,
    sort: "id",
    error: undefined
}

export const products = handleActions({
    [getDataRoutine.REQUEST]
        (state, action) {
        return update(state, {
            loading: {$set: true},
            data: {$push: action.payload}
        });
    },
    [getDataRoutine.SUCCESS]
        (state, action) {
        return update(state, {
            dataCached: {$set: action.payload},
            nextPage: {$set: action.payload.length ? state.nextPage + 1 : undefined}
        });
    },
    [getDataRoutine.FAILURE]
        (state, action) {
        return update(state, {
            error: {$set: action.payload},
        });
    },
    [getDataRoutine.FULFILL]
        (state, action) {
        return update(state, {
            loading: {$set: false},
        });
    },
    SET_LOADING: (state, action) => {
        return {...state, loading: action.payload}
    },
    GET_DATA_FROM_CACHE: (state, action) => {
        return update(state, {data: {$set: state.data.concat(action.payload)}})
    },
    CACHE_DATA: (state, action) => {
        return update(state, {dataCached: {$set: action.payload}})
    },
    SET_NEXT_PAGE: (state, action) => {
        return update(state, {nextPage: {$set: action.payload}})
    },
    SET_SORT: (state, action) => {
        return update(state, {sort: {$set: action.payload}})
    },
    SET_ERROR: (state, action) => {
        return {...state, error: action.payload}
    }
}, DEFAULT_STATE)

export default combineReducers({
    products
})