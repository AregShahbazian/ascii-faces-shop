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
            nextPage: 1,
            sort: PRODUCT_ATTRIBUTES.id,
            lastAd: null,
            loading: false,
            error: undefined
        };
    }

    getData = () => {
        if (this.shouldGetData()) {
            console.info(`we have ${this.state.data.length} rows now`)
            console.log(`Getting data from page ${this.state.nextPage} sorted by ${this.state.sort}`);

            this.setState({loading: true})

            fetchData(this.state.nextPage, this.state.sort)
                .then(
                    (response) => {
                        this.setState({
                            data: this.state.data.concat(response.data),
                            nextPage: response.data.length ? this.state.nextPage + 1 : undefined,
                            loading: false
                        });
                        /* On very high resolution screens, or when user the has zoomed out, the initial data batch
                         * might not fill the screen enough, and loading more data by scrolling won't be possible.
                         * Getting data recursively until the screen is filled will prevent this situation */
                        this.getData()
                    })
                .catch((error) => {
                    console.error(error);
                    this.setState({error});
                });

        }
    }

    shouldGetData() {
        // Check if the user is viewing the end of the page and there's currently no data loading
        return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && !this.state.loading && this.state.nextPage;
    }

    setSort = (event) => {
        let sort = event.target.value;
        console.log(`Sorting by ${sort}...`);
        this.setState(
            {
                data: [],
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