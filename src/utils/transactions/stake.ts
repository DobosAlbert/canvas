import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { stakeAddress, COLLECTION_IDENTIFIER } from '../../config';
import { numHex } from '../functions/numHex';
import { Address } from '@multiversx/sdk-core/out';
export const stakeTransaction = async ({amount, reciver, nonce = 1}: {amount: number, reciver?: string, nonce?: number}) => {
    const stake = {
        value: 0,
        data: 'ESDTNFTTransfer'
            + '@'
            + Buffer.from(COLLECTION_IDENTIFIER).toString('hex')
            + '@'
            + numHex(nonce)
            + '@'
            + numHex(amount)
            + '@'
            + new Address(stakeAddress).hex()
            + '@'
            + Buffer.from('stake').toString('hex'),
        receiver: reciver ? reciver : stakeAddress,
        gasLimit: 60000000
    };
    await refreshAccount();
      
          await sendTransactions({
            transactions: stake,
            transactionsDisplayInfo: {
              processingMessage: 'Processing transaction',
              errorMessage: 'An error has occured',
              successMessage: 'transaction successful'
            },
            redirectAfterSign: false
          });
}