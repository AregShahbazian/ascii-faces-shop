import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import AdContainer from "../containers/AdContainer";
import styles from "./style/Grid.css";

const WAIT_FOR_AD = 20;
const timeForAd = (a) => (a % (WAIT_FOR_AD + 1) !== 0);

let Oops = () => (
    <div className={styles.errorFooter}>Oops.. something went wrong \_(ʘ_ʘ)_/</div>
);

let Loading = () => (
    <div className={styles.loadingFooter}>
        <div className={styles.rect1}/>
        <div className={styles.rect2}/>
        <div className={styles.rect3}/>
        <span className={styles.loadingMessage}>Loading ...</span>
        <div className={styles.rect4}/>
        <div className={styles.rect5}/>
        <div className={styles.rect6}/>
    </div>
);

let EndOfCat = () => (
    <div className={styles.endOfCatFooter}>~ end of catalogue ~</div>
);

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
        {error ? <Oops/> :
            loading ? <Loading/> :
                !nextPage ? <EndOfCat/> : undefined}
    </div>
};

Grid.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    nextPage: PropTypes.number,
    error: PropTypes.object
};

export default Grid
