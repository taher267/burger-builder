import React from "react";
import dateFormat from "dateformat";
const OrderItem = props => {
    const ingredents = props.order.ingredents.map(item => {
        return (<span key={item.type} className="border rounded-2 p-2 me-2">{item.layer}x <span className="text-capitalize">{item.type}</span></span>)
    });
    return (
        <div className="border border-2 p-4 rounded-1 mb-3 shadow ">
            <p>Order No: {props.order.id}</p>

            <p> Delivery Address: {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredents}
            <hr />
            <p>{dateFormat(props.order.orderTime, "dd-mm-yyyy")}</p>
            <p>{props.order.price} BDT</p>
        </div>)
};
export default OrderItem;