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
    <div className="App" ref={appRef}>
      <Menu />
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
