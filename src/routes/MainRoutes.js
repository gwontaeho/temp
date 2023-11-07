import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { FormEx } from "@/ex/components/FormEx";
import { GridEx } from "@/ex/components/GridEx";
import { SearchEx } from "@/ex/pages/SearchEx";

export const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<FormEx />} />
        <Route path="/grid" element={<GridEx />} />
        <Route path="/page/search" element={<SearchEx />} />
      </Routes>
    </MainLayout>
  );
};

export const MAIN_ROUTES = [
  {
    name: "component ex",
    children: [
      {
        name: "form",
        to: "/",
      },
      {
        name: "grid",
        to: "/grid",
      },
    ],
  },
  {
    name: "page ex",
    children: [
      {
        name: "search page",
        to: "/page/search",
      },
    ],
  },
];
