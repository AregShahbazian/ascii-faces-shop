import React from "react";
import PropTypes from "prop-types";

let Grid = ({data, loading}) => (
    <div className="products-grid">
        <p>{JSON.stringify(loading)}</p>
        <p>{JSON.stringify(data)}</p>
    </div>
)

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired
}

export default Grid
