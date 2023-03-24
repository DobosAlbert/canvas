import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { stakeAddress } from '../../config';
export const claimTransaction = async () => {
  const claimRewards = {
    value: 0,
    data: 'claimRewards',
    receiver: stakeAddress,
    gasLimit: 30000000
  };
  await refreshAccount();

  await sendTransactions({
    transactions: claimRewards,
    transactionsDisplayInfo: {
      processingMessage: 'Processing transaction',
      errorMessage: 'An error has occured',
      successMessage: 'transaction successful'
    },
    redirectAfterSign: false
  });
};
