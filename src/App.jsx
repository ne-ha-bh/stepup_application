// import * as React from 'react';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { Outlet } from 'react-router';
// import { ReactRouterAppProvider } from '@toolpad/core/react-router';
// import imgUrl from './assets/StepUp-Logo.png';
// import UploadFileIcon from '@mui/icons-material/UploadFile'; // Correct import

// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Main items',
//   },
//   {
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//     path: '/dashboard',
//   },
//   {
//     title: 'Upload Data',
//     icon: <UploadFileIcon />,
//     path: '/',
//   },
// ];

// const BRANDING = {
//   title: '',
//   logo: <img src={imgUrl} alt="Step UP" />,
// };

// export default function App() {
//   return (
//     <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
//       <Outlet />
//     </ReactRouterAppProvider>
//   );
// }

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Layout from './layouts/dashboard'; 
// PrivateRoute Component
function PrivateRoute({ children }) {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function App() {
    const access_token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    if (!access_token) {
        // Not logged in, render only the login page
        return <Outlet />;
    }

    if (role === 'capdev') {
        // capdev role, render layout
        return (
            <Layout>
                <Outlet />
            </Layout>
        );
    } else if (role === 'learner') {
        // learner role, render without layout.
        return <Outlet />;
    }
    // handle edge cases
    return <Navigate to="/login" replace />;

}

export default App;