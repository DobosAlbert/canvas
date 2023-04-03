import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Item as ShopItem } from 'utils/types'
import axios from 'axios';
import { API_URL } from 'config';
import { numHex } from 'utils/functions/numHex';
import { buyItemTransaction } from 'utils/transactions/buyItem';
import { observer } from 'mobx-react-lite';
import account from 'store/AccountStore';

export const Item = observer(({item}: {item: ShopItem}) => {
    const { estarBalance } = account;
    const [loading, setLoading] = useState<boolean>(false);
    const [sftDetails, setSftDetails] = useState<NftType>();
    const [amount, setAmount] = useState<number>(1);

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

    const decreaseAmount = () => {
        if(amount > 1) {
            setAmount(amount - 1);
        }
    }

    const increaseAmount = () => {
        if(amount < item.amount) {
            setAmount(amount + 1);
        }
    }

    const verify = () => {
        console.log(estarBalance)
        if(amount * item.price > estarBalance) {
            alert('You do not have enough ESTAR to buy this item!');
            return;
        }
        buyItemTransaction({estar_amount: item.price * amount, amount, nonce: item.nonce});
    }

    if(loading) return (<Col xs={12} sm={6} md={4} lg={3} xl={3}>
        <Card className="loading-skeleton">
            <Card.Img src="//placekitten.com/300/250" alt="..." style={{ minHeight: "250px" }} />
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <h5>xCastle Item</h5>
                <button className="btn btn-primary">buy</button>
            </Card.Header>
        </Card>
    </Col>)

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3}>
        <Card>
            <div className='image-container'>
                <Card.Img src={sftDetails?.url} style={{ borderRadius: '10px 10px 0 0', minHeight: "200px" }} />
                <div className='image-badge-left'>
                    <h5 className='pt-1 mr-1'>x{item.amount}</h5>
                </div>
                <h5 className='image-badge-right'><img
                      src='https://media.elrond.com/tokens/asset/ESTAR-461bab/logo.svg'
                      width={20}
                      height={20}
                      className={'mr-2'}
                    />{item.price}</h5>
                <button className='image-badge-bottom-left mb-2' onClick={decreaseAmount}>-</button>
                <h5 className='image-badge-bottom-center mb-2'>{amount}</h5>
                <button className='image-badge-bottom-right mb-2' onClick={increaseAmount}>+</button>
            </div>
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <h5>{sftDetails?.name}</h5>
                <Button className='d-block mx-auto custom-btn' onClick={verify}>Buy</Button>
            </Card.Header>
        </Card>
    </Col>
  )
});
