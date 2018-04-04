import React from "react";
import AdContainer from "../containers/AdContainer";
import styles from "./style/Header.css";

let Header = () => (
    <header className={styles.header}>
        <h1>Products Grid</h1>
        <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our
            selection of ascii faces in an exciting range of sizes and prices.</p>
        <p>But first, a word from our sponsors:</p>
        <AdContainer/>
    </header>
);

export default Header
