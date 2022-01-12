import React from "react";

const Summary = props => {
    const mapping = props.ingredents.map(item => <li key={item.type}> {item.type} <span>{item.layer}</span> </li>);
    return <ul className="list-unstyled">
        {mapping}
    </ul>
}
export default Summary;