import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { SampleMain } from "@/tra/sample/SampleMain";

export const Main = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/sample/*" element={<SampleMain />} />
      </Routes>
    </MainLayout>
  );
};
