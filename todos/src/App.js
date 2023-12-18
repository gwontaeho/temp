import "./App.css";
import { Add } from "./components/add/add";
import { List } from "./components/list/list";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
        todos
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
      </div>
      <Add />
      <List />
    </div>
  );
}

export default App;
