import React from "react";
import PropTypes from "prop-types";

let SortSelect = ({productAttributes, sort, handleChange}) => (
    <div id="sort-select">
        Sort items by:
        <select onChange={handleChange}>
            <option value={productAttributes.id}>Id</option>
            <option value={productAttributes.size}>Size</option>
            <option value={productAttributes.price}>Price</option>
        </select>
    </div>
)

SortSelect.propTypes = {
    productAttributes: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default SortSelect
