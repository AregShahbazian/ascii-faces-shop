import "regenerator-runtime/runtime";
import React from "react"
import {render} from "react-dom";
import GridContainer from "./containers/GridContainer";
import Header from "./components/Header";

render(
    <div>
        <Header/>
        <GridContainer/>
    </div>,
    document.getElementById('root')
);
