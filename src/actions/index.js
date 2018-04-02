import {createAction} from "redux-actions"
import {createRoutine} from "redux-saga-routines"

const GET_DATA = "GET_DATA"
const SET_LOADING = "SET_LOADING"
const GET_DATA_FROM_CACHE = "GET_DATA_FROM_CACHE"
const CACHE_DATA = "CACHE_DATA"
const SET_NEXT_PAGE = "SET_NEXT_PAGE"

const SET_SORT = "SET_SORT"
const CHANGE_SORT = "CHANGE_SORT"

const SET_ERROR = "SET_ERROR"

export const getData = createAction(GET_DATA)
export const setLoading = createAction(SET_LOADING)
export const getDataFromCache = createAction(GET_DATA_FROM_CACHE)
export const cacheData = createAction(CACHE_DATA)
export const setNextPage = createAction(SET_NEXT_PAGE)

export const changeSort = createAction(CHANGE_SORT)
export const setSort = createAction(SET_SORT)

export const setError = createAction(SET_ERROR)


export const getDataRoutine = createRoutine(GET_DATA)