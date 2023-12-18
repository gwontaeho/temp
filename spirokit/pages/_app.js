import "@/styles/globals.css";
import "dayjs/locale/ko";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RadioButtonUnchecked as RadioButtonUncheckedIcon, RadioButtonChecked as RadioButtonCheckedIcon } from "@mui/icons-material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

const theme = createTheme({
    palette: {
        spirokit: {
            bg: "#F1F6F8",
            red: { 1: "#FF9191", 2: "#FFF5F5" },
            border: "#E6E9F4",
            footer: "#4A565A",
        },
        primary: { main: "#018ABE" },
        secondary: { main: "#606060" },
    },
    components: {
        MuiTextField: {
            defaultProps: { size: "small" },
        },
        MuiOutlinedInput: {
            styleOverrides: { root: { borderRadius: 20, ".Mui-disabled& fieldset": { borderColor: "#eee !important" } } },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
                sx: { boxShadow: "0px 3px 6px #0000001A" },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: { padding: "8px 4px" },
            },
        },
        MuiButton: {
            defaultProps: { variant: "outlined" },
            styleOverrides: { root: { borderRadius: 20 } },
        },
        MuiCheckbox: {
            defaultProps: {
                size: "small",
                icon: <RadioButtonUncheckedIcon />,
                checkedIcon: <RadioButtonCheckedIcon />,
            },
        },
        MuiSelect: { defaultProps: { size: "small" } },
        MuiTableCell: { defaultProps: { align: "center" } },
        MuiPagination: { defaultProps: { color: "primary", shape: "rounded", showFirstButton: true, showLastButton: true } },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 0, refetchOnWindowFocus: false },
    },
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <CssBaseline />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                                <Component {...pageProps} />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
