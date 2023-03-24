import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import { PageLayout } from '../components/PageLayout';
export const ComingSoon = () => {
  return (
    <PageLayout>
      <Row className='my-5'>
        <Col xs={12} className='text-center'>
          <FontAwesomeIcon
            icon={faGear}
            fontSize={'40px'}
            className='gear-loop'
          />
          <h1 className='text-bold mt-3'>Great things coming soon.</h1>
          <h5>We are a small and growing ecosystem with big ideas.</h5>
        </Col>
      </Row>
    </PageLayout>
  );
};
