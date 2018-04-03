import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import AdContainer from "../containers/AdContainer";
import styles from "./Grid.css"

const WAIT_FOR_AD = 20;
const timeForAd = (a) => (a % (WAIT_FOR_AD + 1) !== 0)

let Grid = ({data, loading, nextPage, error}) => {
    let a = 1;

    return <div>
        <div className={styles.productGrid}>
            {data.map(row => {
                return timeForAd(a++) ?
                    <Product
                        key={row.id}
                        {...row}/> :
                    <AdContainer key={a}/>
            })}
        </div>
        <p>{
            error ? "Oops.. something went wrong" :
                loading ? "Loading..." :
                    !nextPage ? "~ end of catalogue ~" : ""}</p>
    </div>
}

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    nextPage: PropTypes.number,
    error: PropTypes.object
}

export default Grid
