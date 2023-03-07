import React from 'react';
import {
  faBank,
  faBuilding,
  faCartShopping,
  faPager,
  faRightLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Navbar as BsNavbar, NavItem, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  return (
    <>
      <BsNavbar>
        <div className='container-fluid px-0 px-md-5 d-flex align-items-start'>
          <Nav className='py-3'>
            {isLoggedIn && (
              <>
                <NavItem>
                  <Link className='navItem-link' to={routeNames.dashboard}>Dashboard</Link>
                </NavItem>
              </>
            )}
          </Nav>
          <NavbarBrand><Logo className='logo'/></NavbarBrand>
          <Nav className='py-3'>
            {isLoggedIn && (
              <>
                <NavItem>
                  <p className='navItem-link' onClick={handleLogout}>
                    Logout
                  </p>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <NavItem>
                <Link className='navItem-link' to={routeNames.unlock}>
                  Connect
                </Link>
              </NavItem>
            )}
          </Nav>
        </div>
      </BsNavbar>
      <Nav className='d-block mx-auto d-sm-flex mx-sm-0 justify-content-center pt-2'>
        <NavItem className='subNavItem-link'><FontAwesomeIcon icon={faRightLeft} /> Swap</NavItem>
        <NavItem className='subNavItem-link'><FontAwesomeIcon icon={faBuilding} /> My Castle</NavItem>
        <NavItem className='subNavItem-link'><FontAwesomeIcon icon={faCartShopping} /> Shop</NavItem>
        <NavItem className='subNavItem-link'><FontAwesomeIcon icon={faBank} /> Banks</NavItem>
        <NavItem className='subNavItem-link'><FontAwesomeIcon icon={faPager} /> Secondary Market</NavItem>
      </Nav>
    </>
  );
};
