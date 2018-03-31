import React from "react";
import PropTypes from "prop-types";
import Grid from "../components/Grid";
import fetchData from "../api"

class GridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextPage: 1,
            lastAd: null,
            loading: false,
            error: undefined
        };
    }

    getData = () => {
        if (this.shouldGetData()) {
            console.log(`Getting data from page ${this.state.nextPage}`)

            this.setState({loading: true})

            fetchData(this.state.nextPage, this.props.sort)
                .then(
                    (response) => {
                        this.setState({
                            data: this.state.data.concat(response.data),
                            nextPage: this.state.nextPage + 1,
                            loading: false
                        })
                        /* On very high resolution screens, or when user the has zoomed out, the initial data batch
                         * might not fill the screen enough, and loading more data by scrolling won't be possible.
                         * Getting data recursively until the screen is filled will prevent this situation */
                        this.getData();
                    })
                .catch((error) => {
                    console.error(error)
                    this.setState({error})
                });
        }
    }

    shouldGetData() {
        // Check if the user is viewing the end of the page and there's currently no data loading
        return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && !this.state.loading;
    }

    render() {
        return <Grid data={this.state.data} loading={this.state.loading} error={this.state.error}/>
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

GridContainer.propTypes = {
    sort: PropTypes.string.isRequired
}

export default GridContainer