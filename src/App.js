import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecoilProvider from "@/recoil";
import { CommonModal, CommonToast } from "@/components";

import { MainRoutes } from "@/routes/MainRoutes";
import { PopupRoutes } from "@/routes/PopupRoutes";

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
