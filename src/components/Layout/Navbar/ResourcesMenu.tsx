import { Nav, NavItem } from 'react-bootstrap';
import { useState } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import './Index.css';

const resourcesList = [
  {
    name: 'My Power'
  },
  {
    name: 'Network Power'
  },
  {
    name: 'Block Reward'
  },
  {
    name: 'Your Reward'
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
  resource: { name: string };
}) => {
  const [amount, setAmount] = useState<number>(0);
  return (
    <NavItem key={resource.name} className={'mb-3 mb-sm-0 mr-0 mr-sm-4'}>
      <div>
        <span className='ml-3'>{resource.name}</span>
      </div>
      <div className='d-flex justify-content-center'>
        {amount}
        <span className='ml-3'>+0</span>
      </div>
    </NavItem>
  );
};
