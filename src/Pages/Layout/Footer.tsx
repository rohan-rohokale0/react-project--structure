import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                backgroundColor: '#f5f5f5',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 1300, // Ensures footer is above other content
            }}
        >
            <Typography variant="body2" color="textSecondary">
                {'© '}
                <Link color="inherit" href="https://yourwebsite.com">
                    Rohan Rohokale
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
};

export default Footer;

