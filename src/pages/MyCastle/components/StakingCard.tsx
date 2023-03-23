import { Card, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { sftStore, Category } from '../store/SftStore';
import { DisplaySftsSelectable } from '../../../components/DisplaySftsSelectable/DisplaySftsSelectable';
import account from 'store/AccountStore';
import { stakeTransaction } from 'utils/transactions/stake';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { unStakeTransaction } from '../../../utils/transactions/unstake';

export const StakingCard = observer(() => {
    const { sfts, sftsStaked, rewards } = account;
    const { sftSelected, amount, category } = sftStore;
    const { address } = useGetAccountInfo();

  return (
    <Card style={{ backgroundColor: "#F5DECC" }}>
        <Card.Title className='d-block d-md-flex justify-content-between pt-4 px-4'><h3>Buildings</h3><h4>Buy on FrameIT</h4></Card.Title>
        <Card.Body>
            <div className="staking-card-content mb-2">
                <div className='d-flex mb-3'>
                    <div className="staking-card-content-category mr-3">
                        <h6>Your staked sfts</h6>
                        <h4>{sftsStaked.length} SFTs</h4>
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
                    <div className="staking-card-content-category">
                        <h6>Your rewards</h6>
                        <h4>0 ECCU</h4>
                        <button
                            className='btn custom-btn'
                            disabled={rewards > 0 ? false : true}
                        >
                            Claim
                        </button>
                    </div>
                </div>
                <p>Select a SFT to unStake!</p>
                <div className="staking-card-content-sfts">
                    <Row>
                        <DisplaySftsSelectable sfts={sftsStaked} category={Category.unStake} />
                    </Row>
                </div>
            </div>
            <div className="staking-card-content">
                <div className='d-flex mb-3'>
                    <div className="staking-card-content-category">
                        <h6>Your sfts</h6>
                        <h4>{sfts.length} SFTs</h4>
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
                </div>
                <p>Select a SFT to stake!</p>
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