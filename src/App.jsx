import { Box, Container, CssBaseline } from "@mui/material";
import Home from "./Pages/Home";
export default function App() {
    return (
        <>
            <CssBaseline />
            <Container fixed>
                <Box height="100vh">
                    <Home />
                </Box>
            </Container>
        </>
    )
}