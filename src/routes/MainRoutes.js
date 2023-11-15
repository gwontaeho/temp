import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { FormEx } from "@/ex/components/FormEx";
import { GridEx } from "@/ex/components/GridEx";
import { TabEx } from "@/ex/components/TabEx";
import { TreeEx } from "@/ex/components/TreeEx";

import { Sample } from "@/ex/pages/Sample/Sample";
import { SampleDetail } from "@/ex/pages/Sample/SampleDetail";
import { SampleRegist } from "@/ex/pages/Sample/SampleRegist";
import { WijmoEx } from "@/ex/components/WijmoEx";

export const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/form" element={<FormEx />} />
        <Route path="/grid" element={<GridEx />} />
        <Route path="/tab" element={<TabEx />} />
        <Route path="/tree" element={<TreeEx />} />
        <Route path="/wijmo" element={<WijmoEx />} />

        <Route path="/page/sample" element={<Sample />} />
        <Route path="/page/sample/:id" element={<SampleDetail />} />
        <Route path="/page/sample/regist" element={<SampleRegist />} />
      </Routes>
    </MainLayout>
  );
};
