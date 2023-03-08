import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../../config';
import { Card, Col, Spinner } from 'react-bootstrap';

const sftCollections = ['COMMON-9b6839', 'RARE-76f5b9', 'EPIC-2449b4', 'KEY-4de125', 'COMMONCHAR-435910', 'LEGENDARY-8679aa'];

export const SFTsToSwap = ({sftSelected, setSftSelected}: {sftSelected: NftType | undefined, setSftSelected: (arg: any) => void}) => {
    const { address } = useGetAccountInfo();
    const [loading, setLoading] = useState<boolean>(true);
    const [sfts, setSfts] = useState<NftType[]>([]);

    const fetchSfts = async () => {
        try {
            setSfts([])
            for(const sftCollection of sftCollections) {
                const { data } = await axios.get(API_URL + '/accounts/' + address + '/nfts?collection=' + sftCollection)
                setSfts((prev) => [...prev, ...data]);
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSfts()
    }, []);

    if(loading) {
        return <Col className='mt-5'>
            <Spinner animation="border" className='d-block mx-auto' role="status">
            </Spinner>
        </Col>
    }

    if(sfts.length === 0) {
        return <Col className='mt-5'>
            <h5 className='text-center text-muted'>No SFTs found!</h5>
        </Col>
    }

    const handleChange = (sft: NftType) => {
        if(sftSelected?.identifier === sft.identifier) {
            setSftSelected(undefined);
        } else {
            setSftSelected(sft)
        }
    }

    return (
        <>
            {sfts.map((sft) => (
                <Col key={sft.identifier} xs={12} sm={4} md={3} className="mb-2">
                    <Card
                      onClick={() => handleChange(sft)}
                      className={`${sftSelected?.identifier === sft.identifier ? "sft-selected" : undefined}`}
                    >
                        <Card.Img src={sft.url} style={{ borderRadius: "10px 10px 0 0" }}></Card.Img>
                        <Card.Header className='d-flex justify-content-between'><span>{sft.name}</span><span>x{sft.balance}</span></Card.Header>
                    </Card>
                </Col>
            ))}
        </>
    );
}
