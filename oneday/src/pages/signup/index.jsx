import React from "react";
import loadable from "@loadable/component";
import { Redirect, Link, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, IndexContainer, Title, TypeContainer } from "./styles";

const User = loadable(() => import("./user"));
const Seller = loadable(() => import("./seller"));

const Signup = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.type !== 0) {
    return <Redirect to="/" />;
  }

  const Index = () => {
    return (
      <IndexContainer>
        <TypeContainer>
          <Link to="/signup/user">일반 회원가입</Link>
          <Link to="/signup/seller">판매자 회원가입</Link>
        </TypeContainer>
      </IndexContainer>
    );
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Switch>
        <Route exact path="/signup" component={Index} />
        <Route path="/signup/user" component={User} />
        <Route path="/signup/seller" component={Seller} />
      </Switch>
    </Container>
  );
};

export default Signup;
