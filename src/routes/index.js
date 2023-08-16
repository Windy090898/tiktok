import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import Suggest from '~/pages/Suggest';
import HeaderOnlyLayout from '~/layouts/HeaderOnlyLayout';
import VideoDetail from '~/pages/VideoDetail';

// Public routes: don't need to login
export const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.following, element: Following },
  { path: config.routes.upload, element: Upload, layout: HeaderOnlyLayout },
  { path: config.routes.profile, element: Profile },
  { path: config.routes.videoDetail, element: VideoDetail, layout: null },
  { path: config.routes.live, element: Live },
  { path: config.routes.explore, element: Explore },
  { path: config.routes.suggest, element: Suggest },
];

export const privateRoutes = [];
