import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
            width="100%"
        >
            <CircularProgress size={60} thickness={4} sx={{ color: "primary.main" }} />
        </Box>
    );
};

export default LoadingSpinner;
