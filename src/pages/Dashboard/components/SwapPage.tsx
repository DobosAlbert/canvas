import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { SFTsToSwap } from './SFTsToSwap';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { numHex } from 'utils/functions/numHex';
import { Address } from '@multiversx/sdk-core/out';
import { contractAddress } from '../../../config';

export const SwapPage = () => {
    const { address } = useGetAccountInfo();
    const [sftSelected, setSftSelected] = useState<NftType>()

    const swap = async () => {
        if(!sftSelected) return;
        const data = 'ESDTNFTTransfer'
            + '@'
            + Buffer.from(sftSelected?.collection).toString('hex')
            + '@'
            + numHex(sftSelected.nonce)
            + '@'
            + numHex(Number(sftSelected.balance))
            + '@'
            + new Address(contractAddress).hex()
            + '@'
            + Buffer.from('swap').toString('hex')

        const swapTransaction = {
            value: 0,
            data: data,
            receiver: address,
            gasLimit: (50000 + 1500 * "swap".length) + 3800000 * Number(sftSelected.balance)
          };
          await refreshAccount();
      
          await sendTransactions({
            transactions: swapTransaction,
            transactionsDisplayInfo: {
              processingMessage: 'Processing Swap transaction',
              errorMessage: 'An error has occured during Swap',
              successMessage: 'Swap transaction successful'
            },
            redirectAfterSign: false
          });
      setSftSelected(undefined)
    }
  return <>
    <Row>
      <Col className='mb-3'>
        <h1 className='text-center'>Swap</h1>
        <h6 className='text-center'>Select a SFT and press the buton!</h6>
        <Button className='d-block mx-auto custom-btn' disabled={!sftSelected ? true : false} onClick={swap}>Swap</Button>
      </Col>
    </Row>
    <Row>
        <SFTsToSwap sftSelected={sftSelected} setSftSelected={setSftSelected}/>
    </Row>
  </>
}
