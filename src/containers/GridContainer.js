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

    getData() {
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
                })
            .catch((error) => {
                this.setState({error})
            });
    }

    onScroll = () => {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) && !this.state.loading
        ) {
            console.log("End of page reached")
            this.getData()
        }
    };

    render() {
        return <Grid data={this.state.data} loading={this.state.loading} error={this.state.error}/>
    }

    componentWillMount() {
        this.getData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

}

GridContainer.propTypes = {
    sort: PropTypes.string.isRequired
}

export default GridContainer