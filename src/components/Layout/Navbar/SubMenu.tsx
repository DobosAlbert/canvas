import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { ReactComponent as SubMenuBtn } from '../../../assets/img/ButtonSubMenu.svg';
import { ReactComponent as Logomining } from '../../../assets/img/miningSubMenu.svg';
import './SubMenu.css';

export const SubMenu = () => {
  const isLoggedIn = useGetIsLoggedIn();

  if (!isLoggedIn) return null;

  return (
    <Nav>
      <div className="header-item">
         <div className='button-mining'>
             <SubMenuBtn className='mining-vector' />
                <div className='group-10'>
                <Logomining className='logomining' />
                 <p className='miningtext'>Mining</p>
            </div>
          </div>
       </div>
    </Nav>
  );
};
