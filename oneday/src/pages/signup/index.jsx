import { useCookies } from "react-cookie";
import loadable from "@loadable/component";
import { Redirect, Link, Switch, Route } from "react-router-dom";

import { Container, Logo, TypeContainer } from "./styles";

const SignupUser = loadable(() => import("./signupuser"));
const SignupSeller = loadable(() => import("./signupseller"));

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  const Index = () => {
    return (
      <TypeContainer>
        <Link to="/signup/user">일반 회원가입</Link>
        <Link to="/signup/seller">판매자 회원가입</Link>
      </TypeContainer>
    );
  };

  return (
    <Container>
      <Logo>로고</Logo>
      <Switch>
        <Route exact path="/signup" component={Index} />
        <Route path="/signup/user" component={SignupUser} />
        <Route path="/signup/seller" component={SignupSeller} />
      </Switch>
    </Container>
  );
};

export default Signup;
