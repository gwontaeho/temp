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
        _title: { fontFamily: "NanumSquareRound", fontSize: "1.2rem", fontWeight: 800 },
    },
    components: {
        MuiFormHelperText: { styleOverrides: { root: { position: "absolute", top: "100%" } } },
        MuiButton: { styleOverrides: { root: { borderRadius: "10px" } } },
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
