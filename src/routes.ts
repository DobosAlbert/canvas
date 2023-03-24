import { RouteType } from '@multiversx/sdk-dapp/types';
import { dAppName } from 'config';
import { withPageTitle } from './components/PageTitle';

import {
  Leaderboard,
  Dashboard,
  Home,
  MyCastle,
  MyWallet,
  Shop
} from './pages';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  myCastle: '/dashboard/castle',
  shop: '/dashboard/shop',
  leaderBoard: '/dashboard/leaderboard',
  myWallet: '/dashboard/wallet',
  unlock: '/unlock'
};

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.myCastle,
    title: 'My Castle',
    component: MyCastle,
    authenticatedRoute: true
  },
  {
    path: routeNames.shop,
    title: 'Shop',
    component: Shop,
    authenticatedRoute: true
  },
  {
    path: routeNames.leaderBoard,
    title: 'Leaderboard',
    component: Leaderboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.myWallet,
    title: 'My Wallet',
    component: MyWallet,
    authenticatedRoute: true
  }
];

export const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • MultiversX ${dAppName}`
    : `MultiversX ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});
