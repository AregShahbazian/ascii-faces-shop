import React from "react";
import PropTypes from "prop-types";
import styles from "./SortSelect.css"

let SortSelect = ({handleChange}) => (
    <div className={styles.sortSelect}>
        Sort items by
        <select onChange={handleChange}>
            <option value="id">ID</option>
            <option value="size">Size</option>
            <option value="price">Price</option>
        </select>
    </div>
)

SortSelect.propTypes = {
    handleChange: PropTypes.func.isRequired
}

export default SortSelect
