import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { auth } from "../../redux/AuthActionCreators";
import { Spinner } from "../Orders/Checkout/Spinner/Spinner";
import './Auth.css';
import 'bootstrap/dist/js/bootstrap.min';
const mapStateToProps = state => ({
    token: state.auth.token,
    userId: state.auth.userId,
    authLoading: state.auth.authLoading,
    authfail: state.auth.authFail,
});
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),

    }
}

class Auth extends Component {
    state = { mode: "Sign Up", modalOpen: false, authFail: null, dismiss: true }
    modeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" });
    }
    modalHandler = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    alertHandler = () => {
        this.setState({ dismiss: !this.state.dismiss });
    }

    componentDidMount() {
        if (this.props.authfail !== null) {
            this.setState({ modalOpen: true });
        }

    }
    render() {
        if (this.props.authLoading) return <Spinner />;

        // if (this.props.authfail !== null) return <Modal isOpen={true} centered ><ModalBody className="bg-danger fw-bold text-light text-center">{this.props.authfail}</ModalBody></Modal>;
        let failmessage = null;
        if (this.props.authfail !== null) {
            failmessage = <div className="alert alert-warning alert-dismissible"><strong></strong>{this.props.authfail}<span className="btn-close" data-bs-dismiss="alert"></span></div>;
        }


        return <div className="container">
            <div className="row py-5">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                    <h4 className="border-bottom mb-4 pb-3"> __{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                        <span className="me-5"></span>
                        <label className="switch" style={{ fontSize: '17px', lineHeight: "31px", zIndex: 99999999 }}>
                            <input type="checkbox" onClick={this.modeHandler} />
                            <span className="slider"><p className={this.state.mode == "Sign Up" ? "text-end text-primary" : "text-start text-light"}>{this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</p></span>
                        </label></h4>
                    <Formik
                        initialValues={{ email: '', password: '', passwordConfirm: '' }}

                        onSubmit={values =>
                            this.props.auth(values.email, values.password, this.state.mode)
                        }

                        // Synchronous validation
                        validate={(values) => {
                            const errors = {};

                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 8) {
                                errors.password = "Password must be atleast 8 digits";
                            }
                            if (this.state.mode === "Sign Up") {
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';
                                } else if (values.passwordConfirm !== values.password) {
                                    errors.passwordConfirm = "Password field doesn't match!";
                                }
                            }
                            // console.log('error', errors);
                            return errors;
                        }}
                    >

                        {({ values, handleChange, handleSubmit, errors }) => <div>

                            <Form className="was-validated login-form" onSubmit={handleSubmit}>

                                <FormGroup>
                                    <Input type="email" required name="email" className={errors.email ? 'is-invalid' : 'is-valid'} onChange={handleChange} value={values.email} placeholder="Email Address.." />
                                    {errors.email ? (<div className="invalid-feedback">{errors.email}</div>) : null}
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" required name="password" className={errors.password ? 'is-invalid' : null} onChange={handleChange} value={values.password} placeholder="Password" />
                                    {errors.password ? (<div className="invalid-feedback">{errors.password}</div>) : null}
                                </FormGroup>
                                {this.state.mode === "Sign Up" ?
                                    <FormGroup>
                                        <Input type="password" required name="passwordConfirm" className={errors.passwordConfirm ? 'is-invalid' : null} onChange={handleChange} value={values.passwordConfirm} placeholder="Confirm Password" />
                                        {errors.passwordConfirm ? (<div className="invalid-feedback">{errors.passwordConfirm}</div>) : null}
                                    </FormGroup>
                                    : null}
                                {/* Error message */}
                                {failmessage}
                                <Button type="submit">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"} <span className="fa fa-arrow-right"></span></Button>

                            </Form>
                        </div>}
                    </Formik>
                </div>
            </div>
        </div >
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);    