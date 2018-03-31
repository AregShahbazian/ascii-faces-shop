import React from "react";
import PropTypes from "prop-types";
import Grid from "../components/Grid";
import fetchData from "../api"
import SortSelect from "../components/SortSelect";

const PRODUCT_ATTRIBUTES = {
    id: "id",
    price: "price",
    size: "size",
    date: "date"
}

class GridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextPage: 1,
            sort: PRODUCT_ATTRIBUTES.id,
            lastAd: null,
            loading: false,
            error: undefined
        };
    }

    getData = (replace = false) => {
        console.log(`Getting data from page ${this.state.nextPage}`)

        this.setState({loading: true})

        fetchData(this.state.nextPage, this.state.sort)
            .then(
                (response) => {
                    this.setState({
                        data: replace ? response.data : this.state.data.concat(response.data),
                        nextPage: this.state.nextPage + 1,
                        loading: false
                    });
                })
            .catch((error) => {
                console.error(error)
                this.setState({error})
            });
    }

    shouldGetData() {
        // Check if the user is viewing the end of the page and there's currently no data loading
        return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && !this.state.loading;
    }


    setSort = (event) => {
        let sort = event.target.value
        console.log(`Sorting by ${sort}`)
        this.setState({sort})
        // clear daa and get new with sort
    }

    render() {
        return <div>
            <SortSelect productAttributes={PRODUCT_ATTRIBUTES} sort={this.state.sort} handleChange={this.setSort}/>
            <Grid data={this.state.data} loading={this.state.loading} error={this.state.error}/>
        </div>
    }

    componentWillMount() {
        this.getData(true)
    }

    onScroll = () => {
        if (this.shouldGetData()) {
            this.getData(false)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

}

export default GridContainer