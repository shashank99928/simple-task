import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    actions?: React.ReactNode;
    showBackButton?: boolean;
}

const Layout = ({ children, title, actions, showBackButton = false }: LayoutProps) => {
    return (
        <Container disableGutters>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
                <Box display="flex" alignItems="center">
                    {showBackButton && (
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <IconButton size="small" component="span" sx={{ mr: 1 }}>
                                <ArrowBackIos fontSize="small" />
                            </IconButton>
                        </Link>
                    )}
                    <Typography variant="h5" fontWeight="bold">
                        {title}
                    </Typography>
                </Box>
                {actions && <Box>{actions}</Box>}
            </Box>

            {children}

        </Container>
    );
}

export default Layout;