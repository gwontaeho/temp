import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes";

const theme = createTheme({
    palette: {
        primary: {
            main: "#177fff",
        },
    },
    typography: {
        fontFamily: ["NanumSquareRound"].join(","),
        body1: { fontSize: "15px" },
    },
    components: {
        MuiFormHelperText: { styleOverrides: { root: { position: "absolute", top: "100%", fontSize: "11px" } } },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    );
}

export default App;
