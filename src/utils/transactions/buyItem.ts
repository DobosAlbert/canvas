import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { marketplaceAddress, TOKEN_DECIMALS, TOKEN_IDENTIFIER } from '../../config';
import { numHex } from '../functions/numHex';
export const buyItemTransaction = async ({
  estar_amount,
  amount,
  nonce
}: {
  estar_amount: number;
  amount: number;
  nonce: number;
}) => {
    console.log(estar_amount, amount, nonce)
  const buyItem = {
    value: 0,
    data:
      'ESDTTransfer' +
      '@' +
      Buffer.from(TOKEN_IDENTIFIER).toString('hex') +
      '@' +
      numHex(estar_amount * TOKEN_DECIMALS) +
      '@' +
      Buffer.from('buyItem').toString('hex') +
      '@' +
      numHex(nonce) +
      '@' +
      numHex(amount),
    receiver: marketplaceAddress,
    gasLimit: 60000000
  };
  await refreshAccount();

  await sendTransactions({
    transactions: buyItem,
    transactionsDisplayInfo: {
      processingMessage: 'Processing transaction',
      errorMessage: 'An error has occured',
      successMessage: 'transaction successful'
    },
    redirectAfterSign: false
  });
};
