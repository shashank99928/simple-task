import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
            <CircularProgress />
        </Box>
    )
}

export default LoadingSpinner
