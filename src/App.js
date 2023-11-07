import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecoilProvider from "@/recoil";
import { MainRoutes } from "@/routes/MainRoutes";
import { PopupRoutes } from "@/routes/PopupRoutes";

import { CommonModal, CommonToast } from "@/components";

function App() {
  return (
    <RecoilProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/popup/*" element={<PopupRoutes />} />
          <Route path="*" element={<MainRoutes />} />
        </Routes>
        <CommonModal />
        <CommonToast />
      </BrowserRouter>
    </RecoilProvider>
  );
}

export default App;
