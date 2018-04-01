import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import update from "immutability-helper"

const DEFAULT_STATE = {
    data: [],
    dataCached: [],
    loading: false,
    nextPage: 1,
    sort: "id",
    error: undefined
}

export const products = handleActions({
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