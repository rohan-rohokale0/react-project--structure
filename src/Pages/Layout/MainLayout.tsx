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
import { useTheme, Box, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Card, MenuItem, Menu, Badge } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Dashboard as DashboardIcon, Info as InfoIcon, AccountCircle } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

const drawerWidth = 240;

const MainLayout: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
      const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleDrawerOpen = () => {
    
      };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
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
        //   { text: 'Home', icon: <HomeIcon />, path: '/' },
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
      <AppBar
          position="fixed"
          sx={{
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
             Testing 
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <p>rohan Rohokale</p>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
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
