import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/AuthActionCreators';
import Logout from './Auth/Logout';
const mapStateToProps = state => ({
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	authCheck: () => dispatch(authCheck())
});

class Main extends Component {
	componentDidMount() {
		this.props.authCheck()
	}
	render() {
		let routes = null;
		if (this.props.token === null) {
			routes = <>
				<Route path="/login" exact component={Auth} />
				<Redirect to='/login' />
			</>

		} else {
			routes = (<>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/orders" exact component={Orders} />
				<Route path="/checkout" exact component={Checkout} />
				<Route path="/logout" exact component={Logout} />
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
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);