import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.100',
                    }}
                >
                    <Container maxWidth="sm">
                        <Paper
                            elevation={4}
                            sx={{
                                p: 5,
                                textAlign: 'center',
                                borderRadius: 3,
                            }}
                        >
                            <WarningAmberRoundedIcon
                                color="warning"
                                sx={{ fontSize: 56 }}
                            />
                            <Typography variant="h5" fontWeight={700} mt={2}>
                                Something went wrong
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={1}
                                sx={{ wordBreak: 'break-word' }}
                            >
                                {this.state.error?.message ?? 'An unexpected error occurred.'}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={this.handleReset}
                                sx={{ mt: 3 }}
                            >
                                Try again
                            </Button>
                        </Paper>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
