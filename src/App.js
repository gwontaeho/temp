import { HashRouter, Routes, Route } from "react-router-dom";
import Drag0 from "./pages/drag0";
import Scroll0 from "./pages/scroll0";
import Hover0 from "./pages/hover0";
import Scroll1 from "./pages/scroll1";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Drag0 />} />
          <Route path="scroll0" element={<Scroll0 />} />
          <Route path="Hover0" element={<Hover0 />} />
          <Route path="Scroll1" element={<Scroll1 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
