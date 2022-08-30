import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes";

const theme = createTheme({
    palette: {
        primary: {
            main: "#177fff",
        },
        _gray: {
            main: "#656565",
            contrastText: "#ffffff",
        },
        _red: {
            main: "#ee0000",
            contrastText: "#ffffff",
        },
        _bg: {
            main: "#f2f3f7",
            contrastText: "#000000",
        },
    },
    typography: {
        fontFamily: ["NanumSquareRound"].join(","),
        body1: { fontSize: "0.95rem" },
        subtitle1: { fontSize: "1.1rem" },
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
