import { PageLayout } from '../../components/PageLayout';
import { Card, Col, Row } from 'react-bootstrap';
import { StakingCard } from './components/StakingCard';
import { observer } from 'mobx-react-lite';

export const MyCastle = observer(() => {
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
  );
});
