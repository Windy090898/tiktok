import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from '~/layouts/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout ? route.layout : route.layout === null ? Fragment : DefaultLayout;
            const Page = route.element;
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
