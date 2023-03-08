import { useEffect, useState } from 'react';
import { useGetAccountInfo, useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Navbar as BsNavbar, NavItem, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { ReactComponent as EccuLogo } from '../../../assets/img/eccu.svg';
import axios from 'axios';
import { API_URL } from '../../../config';
import { SubMenu } from './SubMenu';

export const Navbar = () => {
  const [eccuBalance, setEccuBalance] = useState<number>(0);
  const [estarBalance, setEstarBalance] = useState<number>(0);
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const fetchTokenBalance = async (token: string) => {
    try {
      const { data } = await axios.get(API_URL + '/accounts/' + address + '/tokens/' + token)
      if(token === "ESTAR-461bab") {
        setEstarBalance(Number(data.balance.slice(0, -18)))
      } else {
        setEccuBalance(Number(data.balance.slice(-18)))
      }
    } catch(error) {
      return 0;
    }
  }

  useEffect(() => {
    fetchTokenBalance('ESTAR-461bab')
    fetchTokenBalance('ECCU-29891f')
  }, [])

  useEffect(() => {
    fetchTokenBalance('ESTAR-461bab')
    fetchTokenBalance('ECCU-29891f')
  }, [address])

  return (
    <>
      <BsNavbar>
        <div className='container-fluid px-0 px-md-5 d-flex align-items-sm-start justify-content-around'>
          <Nav className='py-3 d-none d-sm-block' style={{ width: "30vw" }}>
            {isLoggedIn && (
              <>
                <NavItem>
                  <Link className='navItem-link' to={routeNames.dashboard}>Dashboard</Link>
                </NavItem>
              </>
            )}
          </Nav>
          <NavbarBrand><Logo className='logo d-block mx-auto'/></NavbarBrand>
          <Nav className='py-3 align-items-center justify-content-end' style={{ width: "30vw" }}>
            {isLoggedIn && (
              <>
                <NavItem className='py-3 d-none d-sm-block'>
                  <p className='navItem-link d-flex align-items-center token-amount'>
                  <EccuLogo width={24} height={24} className={'mr-2'} /> {eccuBalance}
                  </p>
                </NavItem>
                <NavItem className='ml-2 py-3 d-none d-sm-block'>
                  <p className='navItem-link d-flex align-items-center token-amount'>
                  <img src='https://media.elrond.com/tokens/asset/ESTAR-461bab/logo.svg' width={24} height={24} className={'mr-2'} /> {estarBalance}
                  </p>
                </NavItem>
                <NavItem className='ml-2'>
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
      <SubMenu />
    </>
  );
};
