import React from 'react';
import { Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={isMobile ? open : true} // Always open on larger screens
      onClose={isMobile ? onClose : undefined} // Only close on mobile
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        {/* <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem> */}
        <ListItem button component={Link} to="home/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

