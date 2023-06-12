import React, { useState } from 'react';
import {
  useGetIsLoggedIn
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import {
  Navbar as BsNavbar,
  NavItem,
  Nav,
  Container
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ReactComponent as Logo } from '../../../assets/img/Logo.svg';
import { ReactComponent as Vector } from '../../../assets/img/Vector.svg';
import { ReactComponent as Logomining } from '../../../assets/img/miningLogo.svg';
import { ReactComponent as Logoshop } from '../../../assets/img/shop2.svg';
import { ReactComponent as LogoshopBlack } from '../../../assets/img/shop-iconwhite.svg';
import { ReactComponent as NormalBtn } from '../../../assets/img/Normal-Btn.svg';
import { ReactComponent as LogoLeaderboard } from '../../../assets/img/Leaderboard.svg';
import { ReactComponent as LogoLeaderboardBlack } from '../../../assets/img/leaderboard-iconblack.svg';
import { ReactComponent as Pozik } from '../../../assets/img/Pozik.svg';
import { ReactComponent as Logoutbtn } from '../../../assets/img/logout-btn.svg';
import { ReactComponent as LogoMiningWhite } from '../../../assets/img/play-iconwhite.svg';//aici trebuie schimbat
import { ReactComponent as LogoWalletWhite } from '../../../assets/img/wallet-iconwhite.svg';
import { ReactComponent as LogoWallet} from '../../../assets/img/wallet-iconblack.svg';
import { SubMenu } from './SubMenu';
import { ResourcesMenu } from './ResourcesMenu';
import { observer } from 'mobx-react-lite';
import account from 'store/AccountStore'; 
import './Index.css';

export const Navbar = observer(() => {
  const { estarBalance, eccuBalance } = account;
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };
   const [isHovered, setIsHovered] = useState(false);
   const [isHovered2, setIsHovered2] = useState(false);
   const [isHovered3, setIsHovered3] = useState(false);
   const [isHovered4, setIsHovered4] = useState(false);


  return (
    <>
      <BsNavbar>
          <Nav>
            {isLoggedIn && (
              <>
               <div className='header-item'>
                  <Logo className='logo' />

                  <a
                  href="#"
                  className="button-mining"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isHovered ? (
                    <div>
                      <Vector className="mining-vector" />
                      <div className="group-10">
                      <Logomining className="logomining" />
                      <p className="miningtext">Mining</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <NormalBtn className="mining-vector" />
                      <div className="group-10">
                      <LogoMiningWhite className="logomining" />
                      <p className="miningtext-hov">Mining</p>
                      </div>
                    </div>
                  )}
                </a>

                <a
                    href="#"
                    className="button-mining2"
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  >
                    {isHovered2 ? (
                      <div>
                        <Vector className="mining-vector" />
                        <div className="">
                          <Logoshop className="logoshop" />
                          <p className="shoptext-hov">Shop</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <NormalBtn className="mining-vector" />
                        <div className="">
                          <LogoshopBlack className="logoshop" />
                          <p className="shoptext">Shop</p>
                        </div>
                      </div>
                    )}
                  </a>

                  <a
                    href="#"
                    className="button-mining3"
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setIsHovered3(false)}
                  >
                    {isHovered3 ? (
                      <div>
                        <Vector className="mining-vector" />
                        <div className="">
                          <LogoLeaderboardBlack className="logoshop" />
                          <p className="leaderboardtext-hov">Leaderboard</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <NormalBtn className="mining-vector" />
                        <div className="">
                          <LogoLeaderboard className="logoshop" />
                          <p className="leaderboardtext">Leaderboard</p>
                        </div>
                      </div>
                    )}
                  </a>

                  <a
                    href="#"
                    className="button-mining4"
                    onMouseEnter={() => setIsHovered4(true)}
                    onMouseLeave={() => setIsHovered4(false)}
                  >
                    {isHovered4 ? (
                      <div>
                        <Vector className="mining-vector" />
                        <div className="">
                          <LogoWallet className="logoshop" />
                          <p className="walletText-hov">My Wallet</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <NormalBtn className="mining-vector" />
                        <div className="">
                          <LogoWalletWhite className="logoshop" />
                          <p className="walletText">My Wallet</p>
                        </div>
                      </div>
                    )}
                  </a>
                  <div className='profile'>
                  <Pozik className='pozik'/>
                  <p className='textprofile'>Constantin Dinamo</p>
                  <Logoutbtn className='logoutbtn'>
                    <p className='textlogout'>Log out</p>
                  </Logoutbtn>
                  </div>
              </div>
              <div className="banner"></div> 
              
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
      </BsNavbar>
    </>
  );
});
