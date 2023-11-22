import { Routes, Route } from "react-router-dom";

import { GroupEx } from "@/tra/sample/components/GroupEx";
import { FormEx } from "@/tra/sample/components/FormEx";
import { GridEx } from "@/tra/sample/components/GridEx";
import { TabEx } from "@/tra/sample/components/TabEx";
import { TreeEx } from "@/tra/sample/components/TreeEx";
import { TableEx } from "@/tra/sample/components/TableEx";
import { WijmoEx } from "@/tra/sample/components/WijmoEx";

import { Sample } from "@/tra/sample/pages/Sample";
import { SampleDetail } from "@/tra/sample/pages/SampleDetail";
import { SampleRegist } from "@/tra/sample/pages/SampleRegist";
import { SampleUpdate } from "@/tra/sample/pages/SampleUpdate";

export const SampleMain = () => {
  return (
    <Routes>
      <Route path="/components/group" element={<GroupEx />} />
      <Route path="/components/form" element={<FormEx />} />
      <Route path="/components/grid" element={<GridEx />} />
      <Route path="/components/tab" element={<TabEx />} />
      <Route path="/components/tree" element={<TreeEx />} />
      <Route path="/components/wijmo" element={<WijmoEx />} />
      <Route path="/components/table" element={<TableEx />} />

      <Route path="/pages" element={<Sample />} />
      <Route path="/pages/:id" element={<SampleDetail />} />
      <Route path="/pages/:id/update" element={<SampleUpdate />} />
      <Route path="/pages/regist" element={<SampleRegist />} />
    </Routes>
  );
};
