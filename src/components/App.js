import React from "react";
import Header from "./Header";
import SortSelectContainer from "../containers/SortSelectContainer";
import GridContainer from "../containers/GridContainer";
import styles from "./App.css"

let App = () => (
    <div className={styles.app}>
        <Header/>
        <SortSelectContainer/>
        <GridContainer/>
    </div>
)

export default App
