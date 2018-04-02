import {createRoutine} from "redux-saga-routines"

const GET_DATA = "GET_DATA"
const SET_SORT = "SET_SORT"

export const getDataRoutine = createRoutine(GET_DATA)
export const setSortRoutine = createRoutine(SET_SORT)
