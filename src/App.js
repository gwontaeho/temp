import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";

const theme = createTheme({
    palette: {
        primary: { main: "#177fff" },
        _gray: { main: "#656565", contrastText: "#ffffff" },
        _red: { main: "#ee0000", contrastText: "#ffffff" },
        _bg: { main: "#f2f3f7", contrastText: "#000000" },
    },
    typography: {
        fontFamily: ["NanumSquareRound"].join(","),
        _title: { fontFamily: "NanumSquareRound", fontSize: "1.2rem", fontWeight: 800 },
        body1: { fontFamily: "NotoSansKR", fontSize: "15px" },
    },
    components: {
        MuiFormHelperText: { styleOverrides: { root: { position: "absolute", top: "100%" } } },
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: "10px" },
                text: { textDecoration: "underline !important", color: "#656565 !important", fontWeight: "bold" },
            },
            defaultProps: { color: "primary", size: "small", variant: "contained" },
        },
        MuiSelect: { styleOverrides: { root: { borderRadius: "10px" } }, defaultProps: { size: "small" } },
        MuiPagination: { defaultProps: { showFirstButton: true, showLastButton: true, color: "primary", shape: "rounded" } },
        MuiPaginationItem: { defaultProps: { components: { first: KeyboardDoubleArrowLeftIcon, last: KeyboardDoubleArrowRightIcon } } },
        MuiChip: { defaultProps: { variant: "outlined", size: "small" } },
        MuiRadio: { defaultProps: { size: "small" } },
        MuiTextField: { defaultProps: { size: "small" } },
        MuiOutlinedInput: { styleOverrides: { root: { borderRadius: "10px" } } },
        MuiCheckbox: { defaultProps: { size: "small" } },
        MuiTableHead: { styleOverrides: { root: { "th ": { fontWeight: "bold" } } } },
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
