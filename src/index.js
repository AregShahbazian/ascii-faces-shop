import "regenerator-runtime/runtime";
import React from "react"
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";
import reducer from "./reducers/index"
import rootSaga from "./saga/index"
import Header from "./components/Header";
import SortSelectContainer from "./containers/SortSelectContainer";
import GridContainer from "./containers/GridContainer";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)


render(
    <Provider store={store}>
        <div>
            <Header/>
            <SortSelectContainer/>
            <GridContainer/>
        </div>
    </Provider>,
    document.getElementById('root')
);
