import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/layouts/PopupLayout";
import { SamplePopup } from "@/tra/sample/SamplePopup";

export const Popup = () => {
  return (
    <PopupLayout>
      <Routes>
        <Route path="/sample/*" element={<SamplePopup />} />
      </Routes>
    </PopupLayout>
  );
};
