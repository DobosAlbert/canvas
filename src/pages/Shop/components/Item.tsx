import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Item as ShopItem } from 'utils/types'
import axios from 'axios';
import { API_URL } from 'config';
import { numHex } from 'utils/functions/numHex';

export const Item = ({item}: {item: ShopItem}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sftDetails, setSftDetails] = useState<NftType>();

    const fetchSftDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(API_URL + '/nfts/' + item.identifier + '-' + numHex(item.nonce));
        setSftDetails(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchSftDetails();
      return () => {
        setSftDetails(undefined);
      };
    }, []);

  return (
    <Col xs={12} sm={4} md={3}>
        <Card>
            <div className='image-container'>
                <Card.Img src={sftDetails?.url} style={{ borderRadius: '10px 10px 0 0' }} />
                <div className='image-badge-left'>
                    <h5 className='pt-1 mr-1'>x{item.amount}</h5>
                </div>
            </div>
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <h5>{sftDetails?.name}</h5>
                <Button className='d-block mx-auto custom-btn'>Buy</Button>
            </Card.Header>
        </Card>
    </Col>
  )
}
