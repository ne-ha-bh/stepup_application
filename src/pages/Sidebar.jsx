// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Box, // Import Box from MUI
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../assets/StepUp-Logo.png'; // Import your logo

// function Sidebar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const role = localStorage.getItem('role');

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   const handleDashboardClick = () => {
//     navigate('/dashboard');
//     setOpen(false); // Close the drawer after navigation
//   };

//   const handleUploadClick = () => {
//     navigate('/upload');
//     setOpen(false); // Close the drawer after navigation
//   };

//   return (
//     <div>
//       <IconButton
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         onClick={handleDrawerToggle}
//         sx={{ mr: 2, display: { md: 'none' } }}
//       >
//         <MenuIcon />
//       </IconButton>

//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={handleDrawerToggle}
//         variant="temporary"
//         ModalProps={{
//           keepMounted: true, 
//         }}
//         sx={{
//           '& .MuiDrawer-paper': { width: 240 },
//           display: { xs: 'block', md: 'none' },
//         }}
//       >
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
//           <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
//         </Box>
//         <List>
//           <ListItem button onClick={handleDashboardClick}>
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <Divider />
//           {role === 'capdev' && (
//             <ListItem button onClick={handleUploadClick}>
//               <ListItemIcon>
//                 <UploadFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Upload" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>

//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', md: 'block' },
//           '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
//         }}
//         open
//       >
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
//           <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
//         </Box>
//         <List>
//           <ListItem button onClick={handleDashboardClick}>
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <Divider />
//           {role === 'capdev' && (
//             <ListItem button onClick={handleUploadClick}>
//               <ListItemIcon>
//                 <UploadFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Upload" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>
//     </div>
//   );
// }

// export default Sidebar;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Box,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../assets/StepUp-Logo.png';

// function Sidebar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const role = localStorage.getItem('role');

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   const handleDashboardClick = () => {
//     navigate('/dashboard');
//     setOpen(false);
//   };

//   const handleUploadClick = () => {
//     navigate('/upload');
//     setOpen(false);
//   };

//   return (
//     <div>
//       <IconButton
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         onClick={handleDrawerToggle}
//         sx={{ mr: 2, display: { md: 'none' } }}
//       >
//         <MenuIcon />
//       </IconButton>

//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={handleDrawerToggle}
//         variant="temporary"
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           '& .MuiDrawer-paper': { width: 240 },
//           display: { xs: 'block', md: 'none' },
//         }}
//       >
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
//           <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
//         </Box>
//         {role === 'capdev' && (
//           <List>
//             <ListItem button onClick={handleDashboardClick}>
//               <ListItemIcon>
//                 <DashboardIcon />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <Divider />
//             <ListItem button onClick={handleUploadClick}>
//               <ListItemIcon>
//                 <UploadFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Upload" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', md: 'block' },
//           '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
//         }}
//         open
//       >
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
//           <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
//         </Box>
//         {role === 'capdev' && (
//           <List>
//             <ListItem button onClick={handleDashboardClick}>
//               <ListItemIcon>
//                 <DashboardIcon />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <Divider />
//             <ListItem button onClick={handleUploadClick}>
//               <ListItemIcon>
//                 <UploadFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Upload" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/StepUp-Logo.png';

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem('role');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setOpen(false);
  };

  const handleUploadClick = () => {
    navigate('/upload');
    setOpen(false);
  };

  const iconColor = '#1976d2'; // Define the color

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { width: 240 },
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
        </Box>
        {role === 'capdev' && (
          <List>
            <ListItem button onClick={handleDashboardClick}>
              <ListItemIcon sx={{ color: iconColor }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleUploadClick}>
              <ListItemIcon sx={{ color: iconColor }}>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItem>
          </List>
        )}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
        open
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="StepUp Logo" style={{ height: '30px' }} />
        </Box>
        {role === 'capdev' && (
          <List>
            <ListItem button onClick={handleDashboardClick}>
              <ListItemIcon sx={{ color: iconColor }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleUploadClick}>
              <ListItemIcon sx={{ color: iconColor }}>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}

export default Sidebar;