import React from "react";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";
const BuildControl = props => <div key={props.type} className="d-flex">
    <div className="ms-auto mr-5">{props.type}</div>
    <div className="btn btn-danger m-1 btn-sm" onClick={props.removelayer}><span className="fa fa-minus"></span></div>
    <div className="btn btn-success m-1 btn-sm" onClick={props.addlayer} ><span className="fa fa-plus"></span></div>
</div>
const Controls = props => {
    return (<div className="col-md-6 text-center">
        <Card >
            <CardTitle className="bg-dark text-light m-0 py-2"><h4>Your Order Here!</h4></CardTitle>
            <CardBody className="mx-auto">
                {props.ingredents.map(item => <BuildControl
                    key={item.type}
                    type={item.type}
                    addlayer={() => props.addlayer(item.type)}
                    // addlayer={() => props.addlayer(item.type)}
                    removelayer={() => props.removelayer(item.type)}

                />)}
            </CardBody>
            <CardFooter>Total Price: {props.totalPrice}</CardFooter>
        </Card>
        <div><Button className="w-100" onClick={props.modalOpen} disabled={!props.purchasable}>Order Now</Button></div>
    </div>)
}
export default Controls;