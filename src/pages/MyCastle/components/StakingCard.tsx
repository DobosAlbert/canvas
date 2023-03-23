import { Card, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { sftStore, Category } from '../store/SftStore';
import { DisplaySftsSelectable } from '../../../components/DisplaySftsSelectable/DisplaySftsSelectable';
import account from 'store/AccountStore';
import { stakeTransaction } from 'utils/transactions/stake';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { unStakeTransaction } from '../../../utils/transactions/unstake';

export const StakingCard = observer(() => {
    const { sfts, sftsStaked } = account;
    const { sftSelected, amount, category } = sftStore;
    const { address } = useGetAccountInfo();

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
                        <h2>0 ECCU</h2>
                    </div>
                </div>
                <div className="staking-card-content-buttons">
                    <button className='btn custom-btn'>Claim</button>
                    <button
                        className='btn custom-btn'
                        disabled={sftSelected ? category === Category.unStake ? false : true : true}
                        onClick={() => {
                            unStakeTransaction({amount, nonce: sftSelected?.nonce});
                            sftStore.resetSft();
                        }}
                    >
                        UnStake
                    </button>
                </div>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsSelectable sfts={sftsStaked} category={Category.unStake} />
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
                    <button
                        className='btn custom-btn'
                        disabled={sftSelected ? category === Category.stake ? false : true : true}
                        onClick={() => {
                            stakeTransaction({amount, nonce: sftSelected?.nonce, reciver: address});
                            sftStore.resetSft();
                        }}
                    >
                        Stake
                    </button>
                </div>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsSelectable sfts={sfts} category={Category.stake} />
                    </Row>
                </div>
            </div>
        </Card.Body>
    </Card>
  )
});