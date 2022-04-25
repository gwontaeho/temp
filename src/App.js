import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Restaurant, Write } from "./components/pages";
import { Nav } from "./components/organisms";

function App() {
    return (
        <div className="App">
            <Nav />
            <div className="Route">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurant/:id" element={<Restaurant />} />
                    <Route path="/write" element={<Write />} />
                </Routes>
            </div>
        </div>
    );
}
export default App;
