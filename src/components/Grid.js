import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

let Grid = ({data, loading, nextPage, error}) => (
    <div id="products-grid">
        {data.map(row =>
            <Product
                key={row.id}
                {...row}/>
        )}
        <p>{
            error ? "Oops.. something went wrong" :
                loading ? "Loading..." :
                    !nextPage ? "~ end of catalogue ~" : ""}</p>
    </div>
)

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    nextPage: PropTypes.number,
    error: PropTypes.object
}

export default Grid
