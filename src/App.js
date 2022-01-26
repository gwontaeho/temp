import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import Project from "./pages/project";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="project" element={<Project />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
