import React, { useCallback, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import loadable from "@loadable/component";

import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/auth";

import { Container, Header, Logo, Nav, Sign, Footer } from "./styles";

const Login = loadable(() => import("../pages/login"));
const Signup = loadable(() => import("../pages/signup"));
const Main = loadable(() => import("../pages/main"));
const Info = loadable(() => import("../pages/info"));
const Category = loadable(() => import("../pages/category"));
const Product = loadable(() => import("../pages/product"));
const Reservation = loadable(() => import("../pages/reservation"));

const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(auth);
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logOut());
  }, []);

  return (
    <Container>
      <Header>
        <Logo>
          <Link to="/">로고</Link>
        </Logo>
        <Nav>
          <Link to="/category?name=all&sort=rating">전체</Link>
          <Link to="/category?name=flower&sort=rating">플라워</Link>
          <Link to="/category?name=art&sort=rating">미술</Link>
          <Link to="/category?name=cooking&sort=rating">요리</Link>
          <Link to="/category?name=handmade&sort=rating">수공예</Link>
          <Link to="/category?name=activity&sort=rating">액티비티</Link>
          <Link to="/category?name=etc&sort=rating">기타</Link>
        </Nav>
        {auth.type === 0 ? (
          <Sign>
            <Link to="/signup">회원가입</Link>
            <Link to="/login">로그인</Link>
          </Sign>
        ) : (
          <Sign>
            <Link to="/info">내 정보</Link>
            <Link to="/" onClick={onClickLogout}>
              로그아웃
            </Link>
          </Sign>
        )}
      </Header>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/info" component={Info} />
        <Route path="/category" component={Category} />
        <Route path="/product" component={Product} />
        <Route
          path="/reservation"
          render={(props) =>
            props.location.state === undefined ? (
              <Redirect to="/" />
            ) : (
              <Reservation {...props} />
            )
          }
        />
      </Switch>
      <Footer />
    </Container>
  );
};

export default Layout;
