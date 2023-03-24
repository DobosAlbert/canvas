import { DisplaySfts } from 'components/DisplaySfts';
import { Col, Row } from 'react-bootstrap';
import { PageLayout } from '../../components/PageLayout';

export const MyWallet = () => {
  return (
    <PageLayout>
      <Row>
        <Col sm={12}>
          <h1 className='text-center'>My Wallet</h1>
        </Col>
      </Row>
      <Row>
        <DisplaySfts xs={12} sm={4} md={3} func={() => {}} />
      </Row>
    </PageLayout>
  );
};
