import React from 'react';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  OperaWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { AuthRedirectWrapper } from 'components';
import { walletConnectV2ProjectId } from 'config';
import { routeNames } from 'routes';

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center' style={{ background: "#F5DECC" }}>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4 d-flex flex-column'>
            <h4 className='mb-4 text-bold'>Login</h4>
            <ExtensionLoginButton
              loginButtonText='MultiversX DeFi Wallet'
              className='btn custom-btn'
              {...commonProps}
            />

            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              className='btn custom-btn'
              {...commonProps}
            />

            <WebWalletLoginButton
              loginButtonText='MultiversX Web Wallet'
              className='btn custom-btn'
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              className='btn custom-btn'
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              className='btn custom-btn'
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true
                  }
                : {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Unlock = () => (
  <AuthRedirectWrapper>
    <UnlockPage />
  </AuthRedirectWrapper>
);
