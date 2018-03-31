import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

let Grid = ({data, loading, error}) => (
    <div id="products-grid">
        {data.map(row =>
            <Product
                key={row.id}
                price={row.price}
                size={row.size}
                date={row.date}/>
        )}
        <p>{error ? "Oops.. something went wrong" : loading ? "Loading..." : ""}</p>
    </div>
)

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired
}

export default Grid
