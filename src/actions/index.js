import {createRoutine} from "redux-saga-routines";
import {createAction} from "redux-actions";

const GET_DATA = "GET_DATA";
const SET_SORT = "SET_SORT";
const SET_LAST_AD = "SET_LAST_AD";

export const getDataRoutine = createRoutine(GET_DATA);
export const setSortRoutine = createRoutine(SET_SORT);
export const setLastAdNo = createAction(SET_LAST_AD);
