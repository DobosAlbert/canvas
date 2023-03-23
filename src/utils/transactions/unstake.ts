import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { stakeAddress, COLLECTION_IDENTIFIER } from '../../config';
import { numHex } from '../functions/numHex';
export const unStakeTransaction = async ({amount, nonce = 1}: {amount: number, nonce?: number}) => {
    const unstake = {
        value: 0,
        data: 'unStake'
            + '@'
            + Buffer.from(COLLECTION_IDENTIFIER).toString('hex')
            + '@'
            + numHex(nonce)
            + '@'
            + numHex(amount),
        receiver: stakeAddress,
        gasLimit: 60000000
    };
    await refreshAccount();
      
          await sendTransactions({
            transactions: unstake,
            transactionsDisplayInfo: {
              processingMessage: 'Processing transaction',
              errorMessage: 'An error has occured',
              successMessage: 'transaction successful'
            },
            redirectAfterSign: false
          });
}