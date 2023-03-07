import { useEffect, useState } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import {
    faBank,
    faBuilding,
    faCartShopping,
    faPager,
    faRightLeft
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeNames } from 'routes';
import { Link, useLocation } from 'react-router-dom';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

const subNavItems = [
    {
      name: "Swap",
      label: "swap",
      link: routeNames.dashboard,
      icon: <FontAwesomeIcon icon={faRightLeft} />
    },
    {
      name: "My Castle",
      label: "castle",
      link: routeNames.myCastle,
      icon: <FontAwesomeIcon icon={faBuilding} />
    },
    {
      name: "Shop",
      label: "shop",
      link: routeNames.shop,
      icon: <FontAwesomeIcon icon={faCartShopping} />
    },
    {
      name: "Bank",
      label: "bank",
      link: routeNames.bank,
      icon: <FontAwesomeIcon icon={faBank} />
    },
    {
      name: "Secondary Market",
      label: "secondary-market",
      link: "https://www.frameit.gg/marketplace/XCASTLE-ee733b/items",
      icon: <FontAwesomeIcon icon={faPager} />
    },
  ]

export const SubMenu = () => {
  const [activeItem, setActiveItem] = useState<string>(subNavItems[0].label);
  const isLoggedIn = useGetIsLoggedIn();
  const { pathname } = useLocation();

  useEffect(() => {
    if(pathname.length > 10) {
      setActiveItem(pathname.slice(11))
    }
  }, [pathname])

  if (!isLoggedIn) return null;

  return (
    <Nav className='d-block mx-auto d-sm-flex mx-sm-0 justify-content-center align-items-center pt-2'>
        {subNavItems.map((subNavItem) => (
          <NavItem
            key={subNavItem.name}
            onClick={() => setActiveItem(subNavItem.label)}
          >
            {
              subNavItem.label !== 'secondary-market' ? <Link
              className={`subNavItem-link ${activeItem === subNavItem.label ? 'active-subNavItem' : undefined}`}
              to={subNavItem.link}
            >
              {subNavItem.icon} {subNavItem.name}
            </Link> : <a href={subNavItem.link} target="_blank" className='subNavItem-link'>{subNavItem.icon} {subNavItem.name}</a>
            }
          </NavItem>
        ))}
      </Nav>
  )
}
