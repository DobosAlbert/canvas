import { Card, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { sftStore, Category } from '../store/SftStore';
import { DisplaySftsSelectable } from '../../../components/DisplaySftsSelectable/DisplaySftsSelectable';
import account from 'store/AccountStore';
import {
  stakeTransaction,
  unStakeTransaction,
  claimTransaction
} from 'utils/transactions';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import stakingStore from 'store/StakingStore';

export const StakingCard = observer(() => {
  const { sfts, sftsStaked, rewards } = account;
  const { sftSelected, amount, category } = sftStore;
  const { sftsAllowed } = stakingStore;
  const { address } = useGetAccountInfo();

  return (
    <Card style={{ backgroundColor: '#F5DECC' }}>
      <Card.Title className='d-block d-md-flex justify-content-between pt-4 px-4'>
        <h3>Buildings</h3>
        <a
          className='text-decoration-none text-dark'
          target={'_blank'}
          href={'https://www.frameit.gg/marketplace/XCASTLE-ee733b/items'}
        >
          <h4>
            Buy on{' '}
            <img
              src='https://www.frameit.gg/assets/img/logo/frameit_logo_grey.svg'
              className='mx-2'
              width={'30px'}
              height={'38px'}
              alt={'frameIt'}
            />
            FrameIT
          </h4>
        </a>
      </Card.Title>
      <Card.Body>
        <div className='staking-card-content mb-2'>
          <div className='d-flex mb-3'>
            <div className='staking-card-content-category mr-3'>
              <h6>Your staked sfts</h6>
              <h4>{sftsStaked.length} SFTs</h4>
              <button
                className='btn custom-btn'
                disabled={
                  sftSelected
                    ? category === Category.unStake
                      ? false
                      : true
                    : true
                }
                onClick={() => {
                  unStakeTransaction({ amount, nonce: sftSelected?.nonce });
                  sftStore.resetSft();
                }}
              >
                UnStake
              </button>
            </div>
            <div className='staking-card-content-category'>
              <h6>Your rewards</h6>
              <h4>{rewards} ECCU</h4>
              <button
                className='btn custom-btn'
                disabled={rewards > 0 ? false : true}
                onClick={claimTransaction}
              >
                Claim
              </button>
            </div>
          </div>
          <p>Select a SFT to unStake!</p>
          <div className='staking-card-content-sfts'>
            <Row>
              <DisplaySftsSelectable
                sfts={sftsStaked}
                category={Category.unStake}
              />
            </Row>
          </div>
        </div>
        <div className='staking-card-content'>
          <div className='d-flex mb-3'>
            <div className='staking-card-content-category'>
              <h6>Your sfts</h6>
              <h4>
                {
                  sfts.filter((sft) => {
                    return sftsAllowed.some((sft_nonce) => {
                      return sft_nonce === sft.nonce;
                    });
                  }).length
                }{' '}
                SFTs
              </h4>
              <button
                className='btn custom-btn'
                disabled={
                  sftSelected
                    ? category === Category.stake
                      ? false
                      : true
                    : true
                }
                onClick={() => {
                  stakeTransaction({
                    amount,
                    nonce: sftSelected?.nonce,
                    reciver: address
                  });
                  sftStore.resetSft();
                }}
              >
                Stake
              </button>
            </div>
          </div>
          <p>Select a SFT to stake!</p>
          <div className='staking-card-content-sfts'>
            <Row>
              <DisplaySftsSelectable
                sfts={sfts.filter((sft) => {
                  return sftsAllowed.some((sft_nonce) => {
                    return sft_nonce === sft.nonce;
                  });
                })}
                category={Category.stake}
              />
            </Row>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});
