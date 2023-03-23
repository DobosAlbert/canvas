import { useGetAccountInfo, useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
import { useEffect } from 'react';
import account from '../../store/AccountStore';
import { PageLayout } from '../../components/PageLayout';
import { Col, Row } from 'react-bootstrap';
import { StakingCard } from './components/StakingCard';
import { observer } from 'mobx-react-lite';

export const MyCastle = observer(() => {
  const { address } = useGetAccountInfo();
  const { success, fail } = useGetActiveTransactionsStatus();

  useEffect(() => {
    account.loadSftsStaked(address);
  }, []);


    useEffect(() => {
      account.loadSfts(address);
      account.loadSftsStaked(address)
    }, [success, fail])

  return (
    <PageLayout>
      <Row>
        <Col>
          <h1 className='text-center'>My Castle</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <StakingCard />
        </Col>
      </Row>
    </PageLayout>
  )
})
