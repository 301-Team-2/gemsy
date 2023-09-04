import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthButtons from './auth/AuthButtons'; // Import your AuthButtons component

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>GEMSY</Navbar.Brand>
      <Nav className="mr-auto">
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/search" className="nav-link">Searches</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
      </Nav>
      <Nav>
        <AuthButtons />
      </Nav>
    </Navbar>
  );
}

export default Header;