import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { FormEx } from "@/sample/components/FormEx";
import { GridEx } from "@/sample/components/GridEx";
import { TabEx } from "@/sample/components/TabEx";
import { TreeEx } from "@/sample/components/TreeEx";
import { TableEx } from "@/sample/components/TableEx";

import { Sample } from "@/sample/pages/Sample/Sample";
import { SampleDetail } from "@/sample/pages/Sample/SampleDetail";
import { SampleRegist } from "@/sample/pages/Sample/SampleRegist";
import { WijmoEx } from "@/sample/components/WijmoEx";

export const MainRoutes = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/form" element={<FormEx />} />
                <Route path="/grid" element={<GridEx />} />
                <Route path="/tab" element={<TabEx />} />
                <Route path="/tree" element={<TreeEx />} />
                <Route path="/wijmo" element={<WijmoEx />} />
                <Route path="/table" element={<TableEx />} />

                <Route path="/page/sample" element={<Sample />} />
                <Route path="/page/sample/:id" element={<SampleDetail />} />
                <Route path="/page/sample/regist" element={<SampleRegist />} />
            </Routes>
        </MainLayout>
    );
};
