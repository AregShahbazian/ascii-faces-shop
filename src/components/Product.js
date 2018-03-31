import React from "react";
import PropTypes from "prop-types";

let Product = ({price, size, date}) => (
    <div className="product">
        {JSON.stringify(date)}
    </div>
)

Product.propTypes = {
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Product
