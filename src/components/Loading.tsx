import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

export const Loading = ({ loadingText }: { loadingText?: string }) => {
  return (
    <Row className='mt-5'>
      <Col>
        <Spinner animation='border' className='d-block mx-auto' />
        {loadingText && (
          <h6 className='text-muted text-center'>{loadingText}</h6>
        )}
      </Col>
    </Row>
  );
};
