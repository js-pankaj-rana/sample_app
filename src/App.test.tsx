import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/appProvider';
import DashBoard from './components/DashBoard';
import List from './components/List';

function renderApp(route = '/') {
  const router = createMemoryRouter([
    { path: "/", element: <DashBoard /> },
    { path: "/list", element: <List /> },  
  ], { initialEntries: [route] });

  return render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

describe('App component with routing', () => {
  it('should render the dashboard by default', () => { 
    renderApp();
    expect(screen.getByText(/List of Favorite Cards/i)).toBeInTheDocument();
  });

  it('navigates to the list page when list path is visited', async () => {
    renderApp('/list');
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

});
