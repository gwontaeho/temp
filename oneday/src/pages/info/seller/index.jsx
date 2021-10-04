import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import loadable from "@loadable/component";

import { Container, Nav, Routes } from "./styles";

const SellerInfo = loadable(() => import("./seller_info"));
const SellerInfoModify = loadable(() => import("./seller_info_modify"));
const SellerClass = loadable(() => import("./seller_class"));
const SellerClassCreate = loadable(() => import("./seller_class_create"));
const SellerClassDetail = loadable(() => import("./seller_class_detail"));
const SellerClassModify = loadable(() => import("./seller_class_modify"));
const SellerReservation = loadable(() => import("./seller_reservation"));
const SellerReservationDetail = loadable(() =>
  import("./seller_reservation_detail")
);
const SellerSchedule = loadable(() => import("./seller_schedule"));
const SellerScheduleDetail = loadable(() => import("./seller_schedule_detail"));
const SellerQna = loadable(() => import("./seller_qna"));
const SellerQnaDetail = loadable(() => import("./seller_qna_detail"));

const Seller = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  if (!cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Nav>
        <Link to="/info">내 정보</Link>
        <Link to="/info/class">클래스 관리</Link>
        <Link to="/info/schedule">일정 관리</Link>
        <Link to="/info/reservation">예약 관리</Link>
        <Link to="/info/qna">문의 관리</Link>
      </Nav>
      <Routes>
        <Switch>
          <Route exact path="/info" component={SellerInfo} />
          <Route exact path="/info/modify" component={SellerInfoModify} />
          <Route exact path="/info/class" component={SellerClass} />
          <Route exact path="/info/create" component={SellerClassCreate} />
          <Route
            exact
            path="/info/class/:index"
            component={SellerClassDetail}
          />
          <Route
            exact
            path="/info/class/modify/:index"
            component={SellerClassModify}
          />
          <Route exact path="/info/reservation" component={SellerReservation} />
          <Route
            exact
            path="/info/reservation/:id"
            component={SellerReservationDetail}
          />
          <Route exact path="/info/schedule" component={SellerSchedule} />
          <Route
            exact
            path="/info/schedule/:id"
            component={SellerScheduleDetail}
          />
          <Route exact path="/info/qna" component={SellerQna} />
          <Route exact path="/info/qna/:id" component={SellerQnaDetail} />
        </Switch>
      </Routes>
    </Container>
  );
};

export default Seller;
