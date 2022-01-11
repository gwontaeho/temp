import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Menu from "./components/menu";
import Home from "./pages/home";

function App() {
  const mode = useSelector((state) => state.mode);
  const appRef = useRef();

  useEffect(() => {
    if (mode.dark) appRef.current.classList.add("dark");
    else appRef.current.classList.remove("dark");
  }, [mode]);

  return (
    <BrowserRouter>
      <div className="App" ref={appRef}>
        <Menu />
        <Header />
        <div className="routes">
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
