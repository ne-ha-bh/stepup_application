// import * as React from 'react';
// import { Outlet } from 'react-router';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { PageContainer } from '@toolpad/core/PageContainer';

// export default function Layout() {
//   return (
//     <DashboardLayout>
//       <PageContainer>
//         <Outlet />
//       </PageContainer>
//     </DashboardLayout>
//   );
// }

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';
import Sidebar from '../pages/Sidebar';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            {/* Removed Logo and logout button from here */}
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}