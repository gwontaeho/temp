import { Routes, Route } from "react-router-dom";

import { PopupSearch } from "@/tancis/sample/pages/SampleList";

export const SamplePopup = () => {
    return (
        <Routes>
            <Route path="/pages" element={<PopupSearch />} />
        </Routes>
    );
};
