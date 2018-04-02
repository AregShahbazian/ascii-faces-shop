import React from "react";
import {connect} from "react-redux";
import SortSelect from "../components/SortSelect";
import {changeSort} from "../actions/index"

const mapStateToProps = (state) => ({
    sort: state.products.sort
})

const mapDispatchToProps = ({
    changeSort
})

class SortSelectContainer extends React.Component {

    changeSort = (event) => {
        let sort = event.target.value;
        console.log(`Sorting by ${sort}...`);
        this.props.changeSort(sort)

/*        this.setState(
            {
                data: [],
                dataCached: [],
                nextPage: 1,
                sort
            });*/

    }

    render() {
        return <SortSelect handleChange={this.changeSort}/>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortSelectContainer)