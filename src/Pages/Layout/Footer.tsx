// Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ p: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'© '}
                <Link color="inherit" href="https://yourwebsite.com">
                    Rohan Rohokale        </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
};

export default Footer;
