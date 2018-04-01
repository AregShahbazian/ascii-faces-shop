import React from "react";
import {connect} from "react-redux";
import Grid from "../components/Grid";
import fetchData from "../api"
import SortSelect from "../components/SortSelect";
import {LOAD_DATA} from "../actions/index"

const PRODUCT_ATTRIBUTES = {
    id: "id",
    price: "price",
    size: "size",
    date: "date"
}


const mapStateToProps = (state) => ({
    nextPage1: state.products.nextPage,
    sort1: state.products.sort
})

const mapDispatchToProps = ({
    loadData: LOAD_DATA
})

class GridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataCached: [],
            loading: false,
            nextPage: 1,
            sort: PRODUCT_ATTRIBUTES.id,
            error: undefined
        };
    }

    getData = () => {
        /*
        * Check that:
        * - the user is viewing the end of the page
        * - there's currently no data being fetched
        * - the last fetch didn't result in an empty list (end of data)
        * */
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)
            && !this.state.loading && this.state.nextPage) {
            this.setState(
                {loading: true},
                this.displayCachedData)

            this.props.loadData({page: this.props.nextPage1, sort: this.props.sort1})

        }

    }

    displayCachedData = () => {
        console.log(`Loading ${this.state.dataCached.length} cached data-rows into grid`);

        this.setState({
            data: this.state.data.concat(this.state.dataCached),
            dataCached: []
        }, this.cacheNewData);
    }

    cacheNewData = () => {
        console.log(`Caching data from page ${this.state.nextPage} sorted by ${this.state.sort}`);

        fetchData(this.state.nextPage, this.state.sort)
            .then(
                (response) => {
                    this.setState({
                            dataCached: response.data,
                            loading: false,
                            nextPage: response.data.length ? this.state.nextPage + 1 : undefined
                        },
                        /* On very high resolution screens, or when user the has zoomed out, the initial data batch
                         * might not fill the screen enough, and loading more data by scrolling won't be possible.
                         * Getting more data recursively until the screen is filled will prevent this situation */
                        this.getData);
                })
            .catch((error) => {
                console.error(error);
                this.setState({error});
            });
    }

    setSort = (event) => {
        let sort = event.target.value;
        console.log(`Sorting by ${sort}...`);
        this.setState(
            {
                data: [],
                dataCached: [],
                nextPage: 1,
                sort
            },
            this.getData);
    }

    render() {
        return <div>
            <SortSelect
                productAttributes={PRODUCT_ATTRIBUTES}
                sort={this.state.sort}
                handleChange={this.setSort}/>

            <Grid
                data={this.state.data}
                loading={this.state.loading}
                error={this.state.error}
                nextPage={this.state.nextPage}/>
        </div>
    }

    componentWillMount() {
        this.getData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.getData, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.getData, false);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GridContainer)