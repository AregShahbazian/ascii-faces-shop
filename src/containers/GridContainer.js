import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "../components/Grid";

const API_URL = "http://localhost:3000/api/products";
const PAGE_SIZE = 15;

class GridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            lastAd: null,
            loading: false
        };
    }

    getData() {
        this.setState({loading: true})

        let {currentPage} = this.state;
        let {sort} = this.props

        axios({
            method: "get",
            url: API_URL + `?_page=${currentPage}&_limit=${PAGE_SIZE}&_sort=${sort}`
        }).then((response) => {
            this.setState({
                data: response.data,
                loading: false
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    render() {
        return <Grid data={this.state.data} loading={this.state.loading}/>
    }

    componentWillMount() {
        this.getData()
    }

}

GridContainer.propTypes = {
    sort: PropTypes.string.isRequired
}


export default GridContainer