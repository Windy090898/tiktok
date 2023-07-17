import routeConfig from '~/config/routes';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';

// Public routes: don't need to login
export const publicRoutes = [
  { path: routeConfig.home, element: Home },
  { path: routeConfig.following, element: Following },
  { path: routeConfig.upload, element: Upload },
  { path: routeConfig.profile, element: Profile },
];

export const privateRoutes = [];
