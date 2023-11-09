import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { FormEx } from "@/ex/components/FormEx";
import { GridEx } from "@/ex/components/GridEx";
import { SearchEx } from "@/ex/pages/SearchEx";
import { TabEx } from "@/ex/components/TabEx";
import { TreeEx } from "@/ex/components/TreeEx";

export const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/form" element={<FormEx />} />
        <Route path="/grid" element={<GridEx />} />
        <Route path="/page/search" element={<SearchEx />} />
        <Route path="/tab" element={<TabEx />} />
        <Route path="/tree" element={<TreeEx />} />
      </Routes>
    </MainLayout>
  );
};
