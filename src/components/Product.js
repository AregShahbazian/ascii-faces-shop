import React from "react";
import PropTypes from "prop-types";

let Product = ({id, price, size, date}) => (
    <div className="product">
        <p>{`Size: ${size}, price: ${price}, date: ${date}, id: ${id}`}</p>
    </div>
)

Product.propTypes = {
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default Product
