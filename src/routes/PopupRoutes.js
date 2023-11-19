import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/layouts/PopupLayout";
import { FormEx } from "@/sample/components/FormEx";
import { GridEx } from "@/sample/components/GridEx";

export const PopupRoutes = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/" element={<FormEx />} />
                <Route path="/grid" element={<GridEx />} />
            </Routes>
        </PopupLayout>
    );
};
