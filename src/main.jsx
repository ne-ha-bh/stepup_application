import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages/DashboardPage';
import InvitedCandidatesPage from './pages/InvitedCandidatesPage';
import PassCandidatesPage from './pages/PassCandidatesPage';
import FailCandidatesPage from './pages/FailCandidatesPage';
import InProgressCandidatesPage from './pages/InProgressCandidatesPage';



const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'invited-candidates',
            Component: InvitedCandidatesPage,
          },
          {
            path: 'pass-candidates',
            Component: PassCandidatesPage,
          },
          {
            path: 'fail-candidates',
            Component: FailCandidatesPage,
          },
          {
            path: 'in-progress-candidate',
            Component: InProgressCandidatesPage,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
