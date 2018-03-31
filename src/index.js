import "regenerator-runtime/runtime";
import React from "react"
import {render} from "react-dom";
import GridContainer from "./containers/GridContainer";

render(
    <GridContainer/>,
    document.getElementById('products')
);
