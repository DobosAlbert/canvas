import React from 'react'
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
    </PageLayout>
  )
}
