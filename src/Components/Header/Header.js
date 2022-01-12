import React from "react";
import { Collapse, Navbar, NavbarBrand, NavItem, Nav, NavbarToggler } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    authfail: state.auth.authFail,
    token: state.auth.token,
    userId: state.auth.userId,
});
const Header = props => {
    let links = null;
    if (props.token === null) {
        links = <NavItem><NavLink className="nav-link" exact to="/login">Login <span className="fa fa-user"></span></NavLink></NavItem>

    } else {
        links = (<>
            <NavItem><NavLink className="nav-link" exact to="/">burger builder</NavLink></NavItem>
            <NavItem><NavLink className="nav-link" exact to="/orders">orders</NavLink></NavItem>
        </>)
    }
    return (<Navbar container expand="md" dark color="dark">
        <NavbarBrand >Brand Nav</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
            <Nav navbar className="text-capitalize">
                {links}
            </Nav>
        </Collapse>
    </Navbar>)
}
export default connect(mapStateToProps)(Header);