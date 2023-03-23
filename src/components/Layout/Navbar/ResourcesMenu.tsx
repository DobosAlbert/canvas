import { Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBeer,
  faBowlFood,
  faCubes,
  faMountain,
  faShield,
  faShirt,
  faTree,
  faWheatAwn
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

const resourcesList = [
  {
    name: 'Food',
    icon: <FontAwesomeIcon icon={faBowlFood} />
  },
  {
    name: 'Wood',
    icon: <FontAwesomeIcon icon={faTree} />
  },
  {
    name: 'Beer',
    icon: <FontAwesomeIcon icon={faBeer} />
  },
  {
    name: 'Iron',
    icon: <FontAwesomeIcon icon={faMountain} />
  },
  {
    name: 'Stone',
    icon: <FontAwesomeIcon icon={faCubes} />
  },
  {
    name: 'WarGear',
    icon: <FontAwesomeIcon icon={faShield} />
  }
];

export const ResourcesMenu = () => {
  const isLoggedIn = useGetIsLoggedIn();

  if (!isLoggedIn) return null;
  return (
    <Nav className='d-none mx-auto d-sm-flex mx-sm-0 justify-content-center align-items-center mt-3 resources-menu text-center'>
      {resourcesList.map((resource, index) => (
        <ResourceItem key={resource.name + index} resource={resource} />
      ))}
    </Nav>
  );
};

export const ResourceItem = ({
  resource
}: {
  resource: { name: string; icon: any };
}) => {
  const [amount, setAmount] = useState<number>(202200);
  return (
    <NavItem key={resource.name} className={'mb-3 mb-sm-0 mr-0 mr-sm-4'}>
      <div>
        {resource.icon}
        <span className='ml-3'>{resource.name}</span>
      </div>
      <div className='d-flex justify-content-center'>
        {amount}
        <span className='ml-3'>+1</span>
      </div>
    </NavItem>
  );
};
