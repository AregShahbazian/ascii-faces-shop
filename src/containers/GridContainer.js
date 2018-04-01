import React from "react";
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
            dataCached: [],
            loading: false,
            nextPage: 1,
            sort: PRODUCT_ATTRIBUTES.id,
            lastAd: null,
            error: undefined
        };
    }

    getData = () => {
        // Check if the user is viewing the end of the page and there's currently no data loading
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)
            && !this.state.loading
            && this.state.nextPage) {
            this.setState(
                {loading: true},
                this.displayCachedData)
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
            <SortSelect productAttributes={PRODUCT_ATTRIBUTES} sort={this.state.sort} handleChange={this.setSort}/>
            <Grid data={this.state.data} loading={this.state.loading} error={this.state.error}
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

export default GridContainer