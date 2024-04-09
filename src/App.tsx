import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import List from './components/List';
import { AppProvider } from './context/appProvider';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

export default function App() {

  const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: DashBoard,
  },
  {
    id: "list",
    path: "/list",
    Component: List
  },
]);


  return (
    <AppProvider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          Test Example
      </Header>
      <Content style={{ padding: '20px 48px' }}>
          
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
          
        </Content>
      </Layout>
    </AppProvider>
  );
}