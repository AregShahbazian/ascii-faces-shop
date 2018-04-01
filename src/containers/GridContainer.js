import React from "react";
import {connect} from "react-redux";
import Grid from "../components/Grid";
import {getData} from "../actions/index"

const mapStateToProps = (state) => ({
    data: state.products.data,
    loading: state.products.loading,
    nextPage: state.products.nextPage,
    error: state.products.error
})

const mapDispatchToProps = ({
    getData
})

class GridContainer extends React.Component {
    render() {
        return <Grid
            data={this.props.data}
            loading={this.props.loading}
            nextPage={this.props.nextPage}
            error={this.props.error}/>
    }


    componentWillMount() {
        this.props.getData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.props.getData, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.getData, false);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GridContainer)