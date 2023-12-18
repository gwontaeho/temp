import { HashRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Home from "./pages/home";
import Project from "./pages/project";

function App() {
  const project = useSelector((state) => state.project);
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="project"
            element={project.open ? <Project /> : <Navigate to="/" />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
