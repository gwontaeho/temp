import "./App.css";
import Header from "./components/header";
import Nav from "./components/nav";
import Bikes from "./components/bikes";
import Detail from "./components/detail";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <Bikes />
        <Nav />
      </div>
      <Detail />
    </div>
  );
}

export default App;
