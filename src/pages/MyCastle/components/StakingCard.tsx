import { Card, Row, Col } from 'react-bootstrap';
import { StakedSftsList } from './StakedSftsList';

export const StakingCard = () => {
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
                    <button className='btn custom-btn'>Stake</button>
                </div>
                <div className="staking-card-content-sfts">
                    <StakedSftsList />
                </div>
            </div>
        </Card.Body>
    </Card>
  )
};