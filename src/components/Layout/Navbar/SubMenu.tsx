import { useEffect, useState } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import {
  faBuilding,
  faCartShopping,
  faList,
  faPager,
  faRightLeft,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeNames } from 'routes';
import { Link, useLocation } from 'react-router-dom';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

const subNavItems = [
  {
    name: 'Swap',
    label: 'swap',
    link: routeNames.dashboard,
    icon: <FontAwesomeIcon icon={faRightLeft} />
  },
  {
    name: 'My Castle',
    label: 'castle',
    link: routeNames.myCastle,
    icon: <FontAwesomeIcon icon={faBuilding} />
  },
  {
    name: 'Shop',
    label: 'shop',
    link: routeNames.shop,
    icon: <FontAwesomeIcon icon={faCartShopping} />
  },
  {
    name: 'Leaderboard',
    label: 'leaderboard',
    link: routeNames.leaderBoard,
    icon: <FontAwesomeIcon icon={faList} />
  },
  {
    name: 'Secondary Market',
    label: 'secondary-market',
    link: 'https://www.frameit.gg/marketplace/XCASTLE-ee733b/items',
    icon: <FontAwesomeIcon icon={faPager} />
  },
  {
    name: 'My Wallet',
    label: 'wallet',
    link: routeNames.myWallet,
    icon: <FontAwesomeIcon icon={faWallet} />
  }
];

export const SubMenu = () => {
  const [activeItem, setActiveItem] = useState<string>(subNavItems[0].label);
  const isLoggedIn = useGetIsLoggedIn();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.length > 10) {
      setActiveItem(pathname.slice(11));
    } else {
      setActiveItem(subNavItems[0].label);
    }
  }, [pathname]);

  if (!isLoggedIn) return null;

  return (
    <Nav className='d-block mx-auto d-sm-flex mx-sm-0 justify-content-center align-items-center mt-4'>
      {subNavItems.map((subNavItem) => (
        <NavItem key={subNavItem.name} className={'mb-3 mb-sm-0'}>
          {subNavItem.label !== 'secondary-market' ? (
            <Link
              className={`subNavItem-link ${
                activeItem === subNavItem.label
                  ? 'active-subNavItem'
                  : undefined
              }`}
              to={subNavItem.link}
              onClick={() => setActiveItem(subNavItem.label)}
            >
              {subNavItem.icon}
              <span className='ml-3'>{subNavItem.name}</span>
            </Link>
          ) : (
            <a
              href={subNavItem.link}
              target='_blank'
              className='subNavItem-link'
            >
              {subNavItem.icon}
              <span className='ml-3'>{subNavItem.name}</span>
            </a>
          )}
        </NavItem>
      ))}
    </Nav>
  );
};
