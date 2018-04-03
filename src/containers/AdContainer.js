import React from "react";
import {connect} from "react-redux";
import Ad from "../components/Ad";
import {setLastAdNo} from "../actions/index"

const mapStateToProps = (state) => ({
    lastAdNo: state.products.lastAdNo
})

const mapDispatchToProps = ({
    setLastAdNo
})

class AdContainer extends React.Component {
    /* Although the ad-number is generated randomly and is never the same twice in a row, different numbers sometimes
    * result in the same ad-image (for example r=723 and r=133). Dealing with this is out of the scope of this project
    * */
    static newAdNo(lastAdNo) {
        let adNo;
        do {
            adNo = Math.floor(Math.random() * 1000);
        } while (adNo === lastAdNo)
        console.log(`Generated new ad number: ${adNo}, which is not the last number ${lastAdNo}`)
        return adNo
    }

    render() {
        return <Ad adNo={this.adNo}/>
    }

    componentWillMount() {
        this.adNo = AdContainer.newAdNo(this.props.lastAdNo)
        this.props.setLastAdNo({lastAdNo: this.adNo})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdContainer)