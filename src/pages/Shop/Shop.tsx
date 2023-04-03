import { useEffect, useState } from 'react';
import { Item } from 'utils/types';
import { MICROSERVICE_URL } from 'config';
import axios from 'axios';
import { ItemsList } from './components/ItemsList';
import { PageLayout } from 'components/PageLayout';
import { Col, Row } from 'react-bootstrap';

export const Shop = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchShopItems = async () => {
    try {
      const { data } = await axios.get(MICROSERVICE_URL + '/marketplace/items');
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchShopItems()
  }, []);

  return <PageLayout>
    <Row className='mb-3'>
      <Col>
        <h1 className='text-center'>Shop</h1>
      </Col>
    </Row>
    <Row>
      <ItemsList items={items} />
    </Row>
  </PageLayout>;
};
