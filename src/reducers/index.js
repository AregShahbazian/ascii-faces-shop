import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {LOAD_DATA} from "../actions/index"

const DEFAULT_STATE = {
    data: [],
    dataCached: [],
    loading: false,
    nextPage: 1,
    sort: "id",
    error: undefined
}

export const products = handleActions({
    "LOAD_DATA": (state, action) => {
        console.info(action)
        return state
    },

}, DEFAULT_STATE)

export default combineReducers({
    products
})