import React from "react";
import breadTop from '../../../assets/images/bread-top.png';
import breadBottom from '../../../assets/images/bread-bottom.png';
import salad from "../../../assets/images/salad.png";
import cheese from "../../../assets/images/cheese.png";
import meet from "../../../assets/images/meet.png";

const Ingredents = props => {
    let ingredents = null;
    switch (props.type) {
        case "bread-top":
            ingredents = <div><img src={breadTop} /></div>;
            break;
        case "bread-bottom":
            ingredents = <div><img src={breadBottom} /></div>;
            break;
        case "salad":
            ingredents = <div><img src={salad} /></div>;
            break;
        case "meat":
            ingredents = <div><img src={meet} /></div>;
            break;
        case "cheese":
            ingredents = <div><img src={cheese} /></div>;
            break;

        default:
            ingredents = null;
            break;
    }

    return (<div>
        {ingredents}
    </div>)
}
export default Ingredents;