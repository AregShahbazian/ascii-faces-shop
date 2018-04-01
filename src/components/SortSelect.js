import React from "react";
import PropTypes from "prop-types";

let SortSelect = ({handleChange}) => (
    <div id="sort-select">
        Sort items by:
        <select onChange={handleChange}>
            <option value="id">Id</option>
            <option value="size">Size</option>
            <option value="price">Price</option>
        </select>
    </div>
)

SortSelect.propTypes = {
    handleChange: PropTypes.func.isRequired
}

export default SortSelect
