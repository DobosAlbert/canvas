import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useEffect } from 'react';
import account from '../../store/AccountStore';
import { PageLayout } from '../../components/PageLayout';
import { Col, Row } from 'react-bootstrap';
import { StakingCard } from './components/StakingCard';
export const MyCastle = () => {
  const { address } = useGetAccountInfo();

  useEffect(() => {
    account.loadSftsStaked(address);
  }, []);

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
}
