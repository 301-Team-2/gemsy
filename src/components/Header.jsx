import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthButtons from './auth/AuthButtons';
import GemsyLogo from '../assets/GemsyLogo.png'


function Header() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand>
        <img
            src={GemsyLogo}
            width="30"
            height="30"
            className="gemsy-logo"
            alt="Gemsy Logo"
        />
        <p className='text-icon'>Gemsy</p>
      </Navbar.Brand>
      <div className='navigation'>
        <Nav className="mr-auto">
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/chat" className="nav-link">Chat AI</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile" className="nav-link">Profile</Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">About Us</Link>
          </NavItem>
        </Nav>
      </div>
        <Nav className='button-nav'>
          <Nav.Item className="auth-buttons-item">
            <AuthButtons />
          </Nav.Item>
        </Nav>
    </Navbar>
  );
}

export default Header;
