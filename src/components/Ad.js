import React from "react";
import PropTypes from "prop-types";
import styles from "./style/Ad.css";

let Ad = ({adNo}) => (
    <img className={styles.ad} src={`http://localhost:3000/ads/?r=${adNo}`}/>
)

Ad.propTypes = {
    adNo: PropTypes.number.isRequired
}

export default Ad
