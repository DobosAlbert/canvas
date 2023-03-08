import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { SFTsToSwap } from './SFTsToSwap';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';

export const SwapPage = () => {
    const [sftSelected, setSftSelected] = useState<NftType>()

    const swap = async () => {

    }
  return <>
    <Row>
      <Col className='mb-3'>
        <h1 className='text-center'>Swap</h1>
        <h6 className='text-center'>Select a SFT and press the buton!</h6>
        <Button variant='primary' className='d-block mx-auto' disabled={!sftSelected ? true : false} onClick={swap}>Swap</Button>
      </Col>
    </Row>
    <Row>
        <SFTsToSwap sftSelected={sftSelected} setSftSelected={setSftSelected}/>
    </Row>
  </>
}
