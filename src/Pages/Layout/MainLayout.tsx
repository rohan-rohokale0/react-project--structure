import React, { useState } from 'react';
import { useTheme, Box, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Category as CategoryIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon, AccountCircle } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";

const drawerWidth = 240;

const MainLayout: React.FC = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Handle logout logic here
        handleMenuClose();
    };

    const drawer = (
        <div>
            <Divider />
            <List>
                {[
                    { text: 'Dashboard', icon: <DashboardIcon />, path: '/home/dashboard' },
                    { text: 'Category', icon: <CategoryIcon />, path: '/home/category-list' },
                    { text: 'Product', icon: <ProductionQuantityLimitsTwoToneIcon />, path: '/home/product-list' },
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

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <p>Rohan Rohokale</p>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{ ml: 2 }}
                        >
                            <AccountCircle></AccountCircle>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <PersonIcon sx={{ mr: 1 }} />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ExitToAppIcon sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>

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
