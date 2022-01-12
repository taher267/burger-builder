import React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
	token: state.auth.token,
	userId: state.auth.userId,
});
const Main = props => {
	let routes = null;
	if (props.token === null) {
		routes = <>
			<Route path="/login" exact component={Auth} />
			<Redirect to='/login' />
		</>

	} else {
		routes = (<>
			<Route path="/" exact component={BurgerBuilder} />
			<Route path="/orders" exact component={Orders} />
			<Route path="/checkout" exact component={Checkout} />
			<Redirect to='/' />
		</>);
	}
	return (
		<> <Header />
			<Switch>
				{routes}
			</Switch>
		</>
	)
}
export default connect(mapStateToProps)(Main);