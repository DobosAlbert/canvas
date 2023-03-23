import { useGetAccountInfo, useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
import { useEffect } from 'react';
import account from '../../store/AccountStore';
import { PageLayout } from '../../components/PageLayout';
import { Card, Col, Row } from 'react-bootstrap';
import { StakingCard } from './components/StakingCard';
import { observer } from 'mobx-react-lite';

export const MyCastle = observer(() => {
  const { address } = useGetAccountInfo();
  const { success, fail } = useGetActiveTransactionsStatus();

  useEffect(() => {
    account.loadSftsStaked(address);
    account.loadRewards(address);
  }, []);


    useEffect(() => {
      account.loadSfts(address);
      account.loadSftsStaked(address)
    }, [success, fail])

  return (
    <PageLayout>
      <Row className='mb-3'>
        <Col>
          <h1 className='text-center'>My Castle</h1>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col xs={12}>
          <StakingCard />
        </Col>
      </Row>
      {/* <Row>
        <Col xs={12}>
          <DisplaySfts />
        </Col>
      </Row> */}
    </PageLayout>
  )
})
