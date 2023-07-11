import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';

// Public routes: don't need to login
export const publicRoutes = [
  { path: '/', element: Home },
  { path: '/following', element: Following },
  { path: '/upload', element: Upload, layout: null },
];

export const privateRoutes = [];
