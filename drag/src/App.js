import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Drag0 from "./pages/drag0";
import Scroll0 from "./pages/scroll0";
import Hover0 from "./pages/hover0";
import Scroll1 from "./pages/scroll1";
import Slide0 from "./pages/slide0";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <div className="route">
          <Routes>
            <Route index element={<Drag0 />} />
            <Route path="scroll0" element={<Scroll0 />} />
            <Route path="hover0" element={<Hover0 />} />
            <Route path="scroll1" element={<Scroll1 />} />
            <Route path="slide0" element={<Slide0 />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
