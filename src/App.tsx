import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios, { InternalAxiosRequestConfig } from "axios";
import RecoilProvider from "@/com/recoil";
import { Main } from "@/com/routes/Main";
import { Popup } from "@/com/routes/Popup";
import { CommonModal, CommonToast } from "@/com/components/_";

function App() {
    useEffect(() => {
        console.log("a");
        axios.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            console.log(config);
            return config;
        });
    }, []);

    return (
        <RecoilProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/popup/*" element={<Popup />} />
                    <Route path="*" element={<Main />} />
                </Routes>
                <CommonModal />
                <CommonToast />
            </BrowserRouter>
        </RecoilProvider>
    );
}

export default App;
