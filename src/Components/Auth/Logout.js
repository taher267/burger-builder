import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { logout } from "../../redux/AuthActionCreators";
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})
class Logout extends Component {
    state = {
        modalOpen: true
    }
    modalHadler = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
        this.props.history.goBack();
    }
    logoutHandler = () => {
        this.props.logout();
    }
    componentDidMount() {
        // console.log(this.props);
    }
    render() {
        return (<Modal isOpen={this.state.modalOpen}>
            <ModalHeader>Title</ModalHeader>
            <ModalBody className="text-center">
                <h6>You are attemptting to log out of Burger Builder.</h6>
                <p>Are you sure? </p>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={this.logoutHandler}>Logout</button>
                <Button className="btn btn-primary" onClick={this.modalHadler}>Cancle</Button>
            </ModalFooter>
        </Modal>)
    }
}
export default connect(null, mapDispatchToProps)(Logout);