import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import "@toast-ui/editor/dist/toastui-editor.css";

const theme = createTheme({
    palette: {
        primary: { main: "#177fff" },
        _bg: { main: "#f2f3f7" },
        _gray: { main: "#656565", contrastText: "#fff" },
    },
    typography: {
        fontFamily: ["NanumSquareRound"].join(","),
        body1: { fontSize: 15 },
    },
    components: {
        MuiTableCell: { defaultProps: { align: "center" } },
        MuiButton: { defaultProps: { variant: "contained", size: "small" } },
        MuiChip: { defaultProps: { variant: "outlined", size: "small" } },
        MuiTextField: { defaultProps: { size: "small" } },
        MuiSelect: { defaultProps: { size: "small" } },
        MuiCheckbox: { defaultProps: { size: "small" } },
        MuiRadio: { defaultProps: { size: "small" } },
    },
});

function App() {
    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <Routes />
                </ThemeProvider>
            </LocalizationProvider>
        </Provider>
    );
}

export default App;
