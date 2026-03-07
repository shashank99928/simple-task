import { Link } from "react-router-dom"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const NotFound = () => {
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Typography variant="h4">404 - Not Found</Typography>
            <Typography variant="body1">The page you are looking for does not exist.</Typography>
            <Link to="/">Go to Home</Link>
        </Container>
    )
}


export default NotFound