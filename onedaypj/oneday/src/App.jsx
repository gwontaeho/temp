import React from "react";
import loadable from "@loadable/component";

const Layout = loadable(() => import("./layout"));

const App = () => {
  return <Layout />;
};

export default App;
