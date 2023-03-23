import { Card, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { sftStore } from '../store/SftStore';
import { DisplaySftsSelectable } from '../../../components/DisplaySftsSelectable/DisplaySftsSelectable';
import account from 'store/AccountStore';

export const StakingCard = observer(() => {
    const { sfts, sftsStaked } = account;
    const { sftSelected } = sftStore;
  return (
    <Card>
        <Card.Title className='d-flex justify-content-between'><h3>Buildings</h3><h4>Buy on FrameIT</h4></Card.Title>
        <Card.Body>
            <div className="staking-card-content mb-2">
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
                    <button className='btn custom-btn' disabled={sftSelected ? false : true}>UnStake</button>
                </div>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsSelectable sfts={sftsStaked} />
                    </Row>
                </div>
            </div>
            <div className="staking-card-content">
                <div className='d-flex'>
                    <div className="staking-card-content-category">
                        <h4>Your sfts</h4>
                        <h2>0 SFTs</h2>
                    </div>
                </div>
                <div className="staking-card-content-buttons">
                    <button className='btn custom-btn' disabled={sftSelected ? false : true}>Stake</button>
                </div>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsSelectable sfts={sfts} />
                    </Row>
                </div>
            </div>
        </Card.Body>
    </Card>
  )
});