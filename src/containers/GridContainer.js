import React from "react";
import {connect} from "react-redux";
import Grid from "../components/Grid";
import {getDataRoutine} from "../actions/index"

const mapStateToProps = (state) => ({
    data: state.products.data,
    loading: state.products.loading,
    nextPage: state.products.nextPage,
    error: state.products.error
})

const mapDispatchToProps = ({
    getData: getDataRoutine.trigger
})

class GridContainer extends React.Component {
    render() {
        return <Grid
            data={this.props.data}
            loading={this.props.loading}
            nextPage={this.props.nextPage}
            error={this.props.error}/>
    }

    triggerGetData = () => {
        this.props.getData({
            needData:
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight)
            && !this.props.loading
            && this.props.nextPage
        })
    }

    componentWillMount() {
        this.triggerGetData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.triggerGetData, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.triggerGetData, false);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GridContainer)