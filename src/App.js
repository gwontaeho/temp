import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecoilProvider from "@/com/recoil";
import { CommonModal, CommonToast } from "@/com/components";

import { Main } from "@/com/routes/Main";
import { Popup } from "@/com/routes/Popup";

function App() {
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
