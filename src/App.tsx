import React, { useEffect } from 'react';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import {
  DappProvider,
  AxiosInterceptorContext
} from '@multiversx/sdk-dapp/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import { apiTimeout, walletConnectV2ProjectId } from 'config';
import { PageNotFound, Unlock } from 'pages';
import { routeNames } from 'routes';
import { routes } from 'routes';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import account from './store/AccountStore';
import stakingStore from 'store/StakingStore';

export const App = () => {
  const { address } = useGetAccountInfo();

  useEffect(() => {
    account.loadSfts(address);
    stakingStore.loadSftsAllowed();
    return () => account.reset();
  }, [address]);

  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor authenticatedDomanis={[]}>
        <Router>
          <DappProvider
            environment={EnvironmentsEnum.mainnet}
            customNetworkConfig={{
              name: 'customConfig',
              apiTimeout,
              walletConnectV2ProjectId
            }}
          >
            <Layout>
              <AxiosInterceptorContext.Listener />
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='custom-class-for-modals' />
              <Routes>
                <Route path={routeNames.unlock} element={<Unlock />} />
                {routes.map((route, index) => (
                  <Route
                    path={route.path}
                    key={'route-key-' + index}
                    element={<route.component />}
                  />
                ))}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Layout>
          </DappProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};
