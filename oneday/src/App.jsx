import { Switch, Route, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const Layout = loadable(() => import("./layout"));
const Login = loadable(() => import("./pages/login"));
const Signup = loadable(() => import("./pages/signup"));

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Layout} />
    </Switch>
  );
};

export default App;
