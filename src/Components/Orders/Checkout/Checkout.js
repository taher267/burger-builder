import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, Form, FormGroup, Input, Modal } from "reactstrap";
import { resetIngedent } from "../../../redux/ActionCreators";
import { BaseUrl } from "../../BaseUrl";
import { Spinner } from "./Spinner/Spinner";

const mapStateToProps = state => ({
    ingredents: state.builder.ingredents,
    purchasable: state.builder.purchasable,
    totalPrice: state.builder.totalPrice
});

const mapDispatchToProps = dispatch => ({
    resetIngedent: () => dispatch(resetIngedent())
})
class Checkout extends Component {
    state = {
        message: { alert: false, text: null, type: null },
        isLoading: false

    }
    inputChangeHandler = event => {
        this.setState({ values: { ...this.state.values, [event.target.name]: event.target.value } });
    }
    dataHandler = customerInfo => {
        this.setState({ isLoading: true })
        const order = {
            ingredents: this.props.ingredents,
            customer: customerInfo,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post(BaseUrl + 'orders.json', order)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ isLoading: false, message: { ...this.state.message, alert: true, text: "Order has been placed!", type: "success" } });

                    setTimeout(() => {
                        this.setState({ message: { ...this.state.message, alert: false } });
                    }, 2500);
                    this.props.resetIngedent();
                    setTimeout(() => {
                        this.goBack()
                    }, 3500);
                }
            })
            .catch(error => {
                this.setState({ isLoading: false, message: { ...this.state.message, alert: true, text: error.message, type: "danger" } });
                setTimeout(() => {
                    this.setState({ message: { ...this.state.message, alert: false } });
                }, 2500);
            })



    }
    goBack = () => {
        this.props.history.goBack('/');
    }
    componentDidMount() {
        if (!this.props.purchasable) return this.goBack();
    }
    render() {

        if (!this.props.purchasable) return <Alert><h3>You have to login or added Ingredent first!</h3></Alert>;
        if (this.state.isLoading) return <Spinner />;

        return <div className="container">
            <div className="row my-4">
                <h4 className="text-center my-5">Checkout Information</h4>
                <p className="text-center py-3 bg-info text-light fw-bold">Payment: {this.props.totalPrice} BDT</p>
                <Formik
                    initialValues={{ deliveryAddress: '', phone: '', deliveryType: "" }}

                    validate={(inpit) => {
                        const errors = {};
                        if (!inpit.deliveryAddress) {
                            errors.deliveryAddress = 'Required';
                        }

                        if (!inpit.phone) {
                            errors.phone = 'Required';

                        } else if (!/^(\+88)?(88)?01([0-9]){9}$/.test(inpit.phone)) {
                            errors.phone = "invalid formatin";
                        }

                        if (!inpit.deliveryType) {
                            errors.deliveryType = 'Required';
                        }
                        // console.log(errors);
                        return errors;
                    }}
                    onSubmit={(values) => {
                        this.dataHandler(values);
                    }}
                >
                    {
                        ({ values, handleChange, handleSubmit, errors, touched }) => {
                            return (
                                <Form className="was-validated" onSubmit={handleSubmit} >
                                    <FormGroup>
                                        <Input type="textarea" name="deliveryAddress"
                                            value={values.deliveryAddress}
                                            onChange={handleChange}

                                            className={(errors.deliveryAddress) ? "is-invalid" : null} placeholder="Delivary Address..." />
                                        {errors.deliveryAddress ? (<div className="invalid-feedback">{errors.deliveryAddress}</div>) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" className={errors.phone ? "is-invalid" : null}
                                            value={values.phone}
                                            onChange={handleChange}
                                            name="phone" placeholder="should be follow (+88019/88019/019xxxxxxx)" />
                                        {errors.phone ? (<div className="invalid-feedback">{errors.phone}</div>) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="select" className={errors.deliveryType ? "form-control is-invalid" : null} aria-label="select example"
                                            value={values.deliveryType}
                                            onChange={handleChange}
                                            name="deliveryType">
                                            <option value="">Select delivery System</option>
                                            <option>Cash On Delivery</option>
                                            <option>Bkash</option>
                                        </Input>
                                        {errors.deliveryType ? (<div className="invalid-feedback">{errors.deliveryType}</div>) : null}
                                    </FormGroup>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-6"><Button className="btn btn-success w-100" type="submit" disabled={!this.props.purchasable}>Place Order</Button></div>
                                                <div className="col-md-6"><Button className="btn btn-danger w-100" type="button" onClick={this.goBack}>Cancle <span className="fa fa-times"></span></Button></div>
                                            </div>
                                        </div>
                                        <div className="col-md-4"><Alert color={this.state.message.type} isOpen={this.state.message.alert}>{this.state.message.text}</Alert></div>
                                    </div >
                                </Form >)
                        }
                    }
                </Formik>

            </div >
        </div >
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);