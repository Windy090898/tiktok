import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';

// Public routes: don't need to login
export const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.following, element: Following },
  { path: config.routes.upload, element: Upload },
  { path: config.routes.profile, element: Profile },
];

export const privateRoutes = [];
