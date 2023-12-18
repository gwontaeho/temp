import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import "dayjs/locale/ko";

import Layout from "@/components/layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LocalizationProvider>
            </QueryClientProvider>
        </>
    );
}
