import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetIsLoggedIn
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import {
  Navbar as BsNavbar,
  NavItem,
  Nav,
  NavbarBrand,
  Container
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { ReactComponent as EccuLogo } from '../../../assets/img/eccu.svg';
import { SubMenu } from './SubMenu';
import { ResourcesMenu } from './ResourcesMenu';
import { observer } from 'mobx-react-lite';
import account from 'store/AccountStore';

export const Navbar = observer(() => {
  const { estarBalance, eccuBalance } = account;
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  return (
    <>
      <BsNavbar>
        <div className='container-fluid px-0 px-md-5 d-flex justify-content-around'>
          <Nav className='py-3 d-none d-sm-block' style={{ width: '30vw' }}>
            {isLoggedIn && (
              <>
                <NavItem>
                  <Link
                    className='navItem-link text-bold'
                    to={routeNames.dashboard}
                  >
                    Dashboard
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
          <NavbarBrand>
            <Logo className='logo d-block mx-auto' />
          </NavbarBrand>
          <Nav
            className='py-3 align-items-center justify-content-end'
            style={{ width: '30vw' }}
          >
            {isLoggedIn && (
              <>
                <NavItem className='py-3 d-none d-sm-block'>
                  <p className='navItem-link d-flex align-items-center token-amount'>
                    <EccuLogo width={20} height={20} className={'mr-2'} /> $
                    {eccuBalance}
                  </p>
                </NavItem>
                <NavItem className='ml-2 py-3 d-none d-sm-block'>
                  <p className='navItem-link d-flex align-items-center token-amount'>
                    <img
                      src='https://media.elrond.com/tokens/asset/ESTAR-461bab/logo.svg'
                      width={20}
                      height={20}
                      className={'mr-2'}
                    />{' '}
                    ${String(estarBalance).slice(0, -18)}
                  </p>
                </NavItem>
                <NavItem className='ml-2'>
                  <p className='navItem-link custom-btn' onClick={handleLogout}>
                    Logout
                  </p>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <NavItem>
                <Link
                  className='navItem-link custom-btn'
                  to={routeNames.unlock}
                >
                  Connect
                </Link>
              </NavItem>
            )}
          </Nav>
        </div>
      </BsNavbar>
      <Container>
        <SubMenu />
        <ResourcesMenu />
      </Container>
    </>
  );
});
