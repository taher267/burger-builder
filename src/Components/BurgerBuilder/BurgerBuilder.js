import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addIngredent, removeIngredent, updatePurchasable } from '../../redux/ActionCreators';
import Summary from '../Summary/Summary';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

const mapStateToProps = state => ({
	ingredents: state.builder.ingredents,
	purchasable: state.builder.purchasable,
	totalPrice: state.builder.totalPrice
})

const mapDispatchToProps = dispatch => ({
	addIngredent: (ltype) => dispatch(addIngredent(ltype)),
	removeIngredent: (ltype) => dispatch(removeIngredent(ltype)),
	updatePurchasable: () => dispatch(updatePurchasable())
})

const INGREDENT_PRICE = {
	salad: 20,
	cheese: 40,
	meat: 90
}
class BurgerBuilder extends Component {
	state = {
		modalOpen: false,
		purchasable: false
	}

	addIngredent = (ltype) => {
		this.props.addIngredent(ltype);
		this.props.updatePurchasable();
	}

	removeIngredent = (ltype) => {
		this.props.removeIngredent(ltype)
		this.props.updatePurchasable();
	}
	modalHandeler = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	}

	checkoutHandler = () => {
		this.props.history.push('/checkout');
	}

	render() {

		return (<>

			<div className='container mt-5'>
				<div className='d-flex flex-column flex-md-row'>
					<Burger ingredents={this.props.ingredents} />
					<Controls ingredents={this.props.ingredents} purchasable={this.props.purchasable} modalOpen={this.modalHandeler} addlayer={this.addIngredent} removelayer={this.removeIngredent} totalPrice={this.props.totalPrice} />
				</div>
			</div>
			<Modal isOpen={this.state.modalOpen}>
				<ModalHeader>Your Order Summary</ModalHeader>
				<ModalBody>
					<h4>Total Price : {this.props.totalPrice}</h4>
					<Summary ingredents={this.props.ingredents} />
				</ModalBody>
				<ModalFooter className='d-flex'>
					<Button type='buttom' style={{ marginLeft: 0 }} onClick={this.checkoutHandler} className='me-auto ml-3 btn-success'>Continue to Checkout</Button>
					<Button type='buttom' className='btn btn-danger' onClick={this.modalHandeler}><span className="fa fa-times"></span> Cancle</Button>
				</ModalFooter>
			</Modal>

		</>)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);