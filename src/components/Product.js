import React from "react";
import PropTypes from "prop-types";

let Product = ({price, size, date}) => (
    <div className="products-grid">
        {data.map(row =>
            <p
                key={row.id}>
                {JSON.stringify(row)}
            </p>
        )}
        <p>{loading && !error ? "Loading..." : "Oops.. something went wrong"}</p>
    </div>
)

Product.propTypes = {
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date)
}

export default Product
