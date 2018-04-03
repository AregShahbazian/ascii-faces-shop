import React from "react";
import PropTypes from "prop-types";

let Ad = ({adNo}) => (
    <img className="ad" src={`http://localhost:3000/ads/?r=${adNo}`}/>
)

Ad.propTypes = {
    adNo: PropTypes.number.isRequired
}

export default Ad
