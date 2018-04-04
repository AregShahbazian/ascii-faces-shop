import React from "react";
import {connect} from "react-redux";
import SortSelect from "../components/SortSelect";
import {setSortRoutine} from "../actions/index";

const mapStateToProps = (state) => ({
    sort: state.products.sort
});

const mapDispatchToProps = ({
    setSort: setSortRoutine.trigger
});

class SortSelectContainer extends React.Component {
    changeSort = (event) => {
        this.props.setSort({sort: event.target.value})
    };

    render() {
        return <SortSelect handleChange={this.changeSort}/>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortSelectContainer)