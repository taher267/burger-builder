import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Modal, ModalHeader } from "reactstrap";
import { fetchOrders } from "../../redux/ActionCreators";
import { Spinner } from "./Checkout/Spinner/Spinner";
import OrderItem from "./OrderItem";
const mapStateToProps = state => ({
    orders: state.builder.orders,
    orderLoading: state.builder.orderLoading,
    orderErr: state.builder.orderErr,
    token: state.auth.token,
    userId: state.auth.userId,
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
});

class Orders extends Component {
    state = {
        errorModal: false,
        noDataModal: false
    }
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
        if (this.props.orderErr) {
            this.setState({ errorModal: true })
        }

        if (this.props.orders.length) {
            this.setState({ noDataModal: true })
        }
    }

    componentDidUpdate() {

    }
    render() {

        let orders = null;

        if (this.props.orderLoading) return <Spinner />;
        if (this.props.orderErr) {
            return <Alert color="danger" className="text-center fw-bold">Something Went wrong!</Alert>
        } else {
            if (!this.props.orders.length) return <Alert color="info">There is no Data</Alert>
            orders = this.props.orders.map(order => <OrderItem order={order} key={order.id} />);
            return (<div className="container">
                <div className="row p-4">
                    <div> {orders}</div>
                </div>
            </div>)
        }



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);