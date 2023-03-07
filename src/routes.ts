import { RouteType } from '@multiversx/sdk-dapp/types';
import { dAppName } from 'config';
import { withPageTitle } from './components/PageTitle';

import { Bank, Dashboard, Home, MyCastle, Shop } from './pages';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  myCastle: '/dashboard/castle',
  shop: '/dashboard/shop',
  bank: '/dashboard/bank',
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
    path: routeNames.bank,
    title: 'Bank',
    component: Bank,
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
