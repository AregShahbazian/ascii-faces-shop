import React from "react";
import PropTypes from "prop-types";

let Grid = ({data, loading, error}) => (
    <div id="products-grid">
        {data.map(row =>
            <p
                key={row.id}>
                {JSON.stringify(row)}
            </p>
        )}
        <p>{loading && !error ? "Loading..." : "Oops.. something went wrong"}</p>
    </div>
)

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired
}

export default Grid
