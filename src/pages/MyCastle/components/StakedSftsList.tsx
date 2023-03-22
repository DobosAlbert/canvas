import account from 'store/AccountStore';
import { Row, Col, Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { SFTStaked } from '../../../utils/types/SftsStaked';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, COLLECTION_IDENTIFIER } from '../../../config';
import { numHex } from '../../../utils/functions/numHex';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { Loading } from 'components/Loading';

export const StakedSftsList = observer(() => {
    const {sftsStaked} = account;

  return <Row>
        {sftsStaked.map((sft) => (
            <Col xs={12} sm={4} md={3} key={sft.nonce}>
                <SftItem sft={sft}/>
            </Col>
        ))}
    </Row>
});

const SftItem = ({sft}: {sft: SFTStaked}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sftDetails, setSftsDetails] = useState<NftType | undefined>(undefined)
    const fetchSftImage = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(API_URL + '/nfts/' + COLLECTION_IDENTIFIER + '-' + numHex(sft.nonce));
            setSftsDetails(data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSftImage()
    }, [])

    if(loading) return <Loading />;

    return <Card>
            <Card.Img src={sftDetails?.url} style={{ borderRadius: "10px 10px 0 0" }}></Card.Img>
            <Card.Header className='d-flex justify-content-between'><span>{sftDetails?.name}</span><span>x{sft.amount}</span></Card.Header>
        </Card>
}
