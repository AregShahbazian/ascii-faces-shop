import React from "react";
import GridContainer from "./GridContainer";

const PRODUCT_ATTRIBUTES = {
    id: "id",
    price: "price",
    size: "size",
    date: "date"
}

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: PRODUCT_ATTRIBUTES.id
        };
    }

    setSort = (sort) => {
        this.setState({sort})
    }

    render() {
        return <GridContainer sort={this.state.sort}/>
    }
}

export default AppContainer
