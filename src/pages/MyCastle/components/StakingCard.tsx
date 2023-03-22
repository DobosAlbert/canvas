import { Card, Row, Col } from 'react-bootstrap';
import { StakedSftsList } from './StakedSftsList';
import { DisplaySfts } from '../../../components/DisplaySfts';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { observer } from 'mobx-react-lite';
import account from 'store/AccountStore';
import { useState } from 'react';

interface NftWithAmount extends NftType {
    amount: number;
}

export const StakingCard = () => {
    const [sftSelected, setSftSelected] = useState<NftWithAmount | undefined>(undefined);

    const stakeSft = (sft: NftType) => {
        console.log(sft)
    }
  return (
    <Card>
        <Card.Title className='d-flex justify-content-between'><h3>Buildings</h3><h4>Buy on FrameIT</h4></Card.Title>
        <Card.Body>
            <div className="staking-card-content">
                <div className='d-flex'>
                    <div className="staking-card-content-category">
                        <h4>Your staked sfts</h4>
                        <h2>0 SFTs</h2>
                    </div>
                    <div className="staking-card-content-category">
                        <h4>Your rewards</h4>
                        <h2>0 ESTAR</h2>
                    </div>
                </div>
                <div className="staking-card-content-buttons">
                    <button className='btn custom-btn'>Claim</button>
                    <button className='btn custom-btn' disabled={sftSelected ? false : true}>Stake</button>
                </div>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsToSelect sftSelected={sftSelected} setSftSelected={setSftSelected} />
                    </Row>
                </div>
            </div>
        </Card.Body>
    </Card>
  )
};

const DisplaySftsToSelect = observer(({sftSelected, setSftSelected}: {sftSelected: NftWithAmount | undefined, setSftSelected: (arg: any) => void}) => {
    const { sfts } = account;
    const handleChange = (sft: NftType) => {
        if(sftSelected?.identifier === sft.identifier) {
            setSftSelected(undefined);
        } else {
            setSftSelected({...sft, amount: 1})
        }
    }

    const increase = (balance: number) => {
        if(!sftSelected) return;
        if(sftSelected?.amount < balance) {
            const sftChanged = {...sftSelected, amount: sftSelected.amount + 1};
            setSftSelected(sftChanged);
        }
    }

    const decrease = () => {
        if(!sftSelected) return;
        if(sftSelected?.amount > 1) {
            const sftChanged = {...sftSelected, amount: sftSelected.amount - 1};
            setSftSelected(sftChanged);
        }
    }

    return <>
        {sfts.map((sft) => (
                <Col key={sft.identifier} xs={12} sm={4} md={3} className="mb-2">
                    <Card
                      className={`${sftSelected?.identifier === sft.identifier ? "sft-selected" : undefined}`}
                    >
                        <Card.Img src={sft.url} style={{ borderRadius: "10px 10px 0 0" }} onClick={() => handleChange(sft)}></Card.Img>
                        <Card.Header className='d-flex justify-content-between'><span>{sft.name}</span><span>x{sft.balance}</span></Card.Header>
                        {
                            sftSelected?.identifier === sft.identifier && <div className='d-flex justify-content-between'>
                                <button className='btn custom-btn' onClick={() => increase(Number(sft.balance))}>+</button>
                                <h4>{sftSelected.amount}</h4>
                                <button className='btn custom-btn' onClick={decrease}>-</button>
                            </div>
                        }
                    </Card>
                </Col>
            ))}
    </>
})