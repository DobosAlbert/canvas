import { Nav, NavItem } from 'react-bootstrap';
import { useState } from 'react';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import './Resources.css';
import { ReactComponent as Logo } from '../../../assets/img/Logo.svg';

export const ResourcesMenu = () => {
  const isLoggedIn = useGetIsLoggedIn();

  if (!isLoggedIn) return null;
  return (
    <Nav className=''>
      {isLoggedIn && (
        <>
           <NavItem className='d-flex align-items-center'>
            <p className='custom-btn custom-btn-res btn btn-lg'>
              <Logo className='rounded-circle mr-1' width={40} height={40} />
              <FontAwesomeIcon icon={faDiscord as IconProp} className='mr-1' />
               <FontAwesomeIcon icon={faTwitter as IconProp} />
            </p>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <p className='custom-btn custom-btn-res btn btn-lg'>
              MyPower
            </p>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <p className='custom-btn custom-btn-res btn btn-lg'>
              LeadBoard
            </p>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <p className='custom-btn custom-btn-res btn btn-lg'>
              Network Power
            </p>
          </NavItem>
        </>
      )}
    </Nav>
  );
};
