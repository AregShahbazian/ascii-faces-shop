import React from "react";
import PropTypes from "prop-types";
import styles from "./style/Product.css";

const centsToDollarSting = (price) => (price / 100).toLocaleString("en-US", {style: "currency", currency: "USD"});

const displayDate = (date) => {
    const millisInADay = 1000 * 60 * 60 * 24;
    let diffInDays = (new Date().getTime() - date.getTime()) / millisInADay;

    if (diffInDays < 1) {
        return "Today"
    } else if (diffInDays < 7) {
        return `${Math.floor(diffInDays)} days ago`
    } else {
        return date.toDateString()
    }
};

let Product = ({face, price, size, date}) => {
    return <div className={styles.product}>
        <div className={styles.face} style={{fontSize: size}}>{face}</div>
        <div>
            <div className={styles.price}>{centsToDollarSting(price)}</div>
            <div className={styles.date}>{displayDate(new Date(date))}</div>
        </div>
    </div>
};

Product.propTypes = {
    face: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
};

export default Product
