// // import * as React from 'react';
// // import * as ReactDOM from 'react-dom/client';
// // import { createBrowserRouter, RouterProvider } from 'react-router';
// // import Layout from './layouts/dashboard';
// // import DashboardPage from './pages/DashboardPage';
// // import UploadDataPage from './pages/UploadDataPage'; 
// // import App from './App.jsx'; 

// // const router = createBrowserRouter([
// //   {
// //     Component: App,
// //     children: [
// //       {
// //         path: '/',
// //         Component: Layout,
// //         children: [
// //           {
// //             path: '',
// //             Component: UploadDataPage,
// //           },
// //           {
// //             path: 'dashboard', // Add route for UploadDataPage
// //             Component: DashboardPage,
// //           }

// //         ],
// //       },
// //     ],
// //   },
// // ]);


import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import DashboardPage from './pages/DashboardPage';
import UploadDataPage from './pages/UploadDataPage';
import BatchDetailsPage from './pages/BatchDetailPage';
import BatchlevelstatusDetailPage from './pages/BatchlevelstatusDetailPage';
import LoginPage from './pages/LoginPage';
import ParticipantDetailsPage from './pages/ParticipantDetailsPage';
import ManageParticipants from './pages/ManageParticipants';
// PrivateRoute Component
function PrivateRoute({ children }) {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                children: [
                    {
                        index: true,
                        Component: LoginPage,
                    },
                    {
                        path: 'dashboard',
                        Component: () => (
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: 'batch-details',
                        Component: BatchDetailsPage,
                    },
                    {
                        path: 'learner-details',
                        Component: BatchlevelstatusDetailPage,
                    },
                    {
                        path: 'login',
                        Component: LoginPage,
                    },
                    {
                        path: 'participant_data',
                        Component: ParticipantDetailsPage,
                    },
                    {
                        path: 'upload',
                        Component: () => (
                            <PrivateRoute>
                                <UploadDataPage />
                            </PrivateRoute>
                        ),
                    },
                    {
                      path: 'manage-participants',
                      Component: () => (
                          <PrivateRoute>
                              <ManageParticipants />
                          </PrivateRoute>
                      ),
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