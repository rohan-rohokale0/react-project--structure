// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { Box } from '@mui/material';

// const MainLayout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Header onMenuClick={handleSidebarToggle} />
//       <Box sx={{ display: 'flex', flex: 1 }}>
//         <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
//           <Outlet />
//         </Box>
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default MainLayout;
// MainLayout.tsx
import React, { useState } from 'react';
import { useTheme, Box, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Card } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Dashboard as DashboardIcon, Info as InfoIcon } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {[
       
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/home/dashboard' },
          { text: 'Category', icon: <InfoIcon />, path: '/home/category-list' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
                '&.active': {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                },
              }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Responsive smart dash
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth 
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                mt: '11vh', // Apply margin-top of 11vh only for desktop
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar /> {/* This is needed to offset the content below the AppBar */}
          <Outlet />
         
        </Box>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
