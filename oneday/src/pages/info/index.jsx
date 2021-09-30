import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadable from "@loadable/component";
import { Container, Nav } from "./styles";

const MyInfo = loadable(() => import("./common/my_info"));
const ModifyInfo = loadable(() => import("./common/modify_info"));
const History = loadable(() => import("./user/history"));
const HistoryDetail = loadable(() => import("./user/history_detail"));
const Classes = loadable(() => import("./seller/classes"));
const Class = loadable(() => import("./seller/class"));
const ModifyClass = loadable(() => import("./seller/modify_class"));
const Create = loadable(() => import("./seller/create"));
const Reservations = loadable(() => import("./seller/reservations"));
const ReservationDetail = loadable(() => import("./seller/reservation_detail"));
const Schedules = loadable(() => import("./seller/schedules"));
const ScheduleDetail = loadable(() => import("./seller/schedule_detail"));
const Qna = loadable(() => import("./seller/qna"));
const QnaDetail = loadable(() => import("./seller/qna_detail"));

const Info = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [type, setType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/auth/type",
          {},
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        setType(parseInt(response.data.type));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Nav>
        <Link to="/info">내 정보</Link>
        {type === 1 ? (
          <>
            <Link to="/info/history">예약 내역</Link>
          </>
        ) : null}
        {type === 2 ? (
          <>
            <Link to="/info/classes">클래스 관리</Link>
            <Link to="/info/schedules">일정 관리</Link>
            <Link to="/info/reservations">예약 관리</Link>
            <Link to="/info/qna">문의 관리</Link>
          </>
        ) : null}
      </Nav>
      <div className="routes">
        <Switch>
          <Route exact path="/info" render={() => <MyInfo type={type} />} />
          <Route exact path="/info/modify" component={ModifyInfo} />
          <Route exact path="/info/history" component={History} />
          <Route exact path="/info/history/:id" component={HistoryDetail} />
          <Route exact path="/info/classes" component={Classes} />
          <Route exact path="/info/class/:index" component={Class} />
          <Route
            exact
            path="/info/class/modify/:index"
            component={ModifyClass}
          />
          <Route exact path="/info/create" component={Create} />
          <Route exact path="/info/schedules" component={Schedules} />
          <Route exact path="/info/schedules/:id" component={ScheduleDetail} />
          <Route exact path="/info/reservations" component={Reservations} />
          <Route
            exact
            path="/info/reservations/:id"
            component={ReservationDetail}
          />
          <Route exact path="/info/qna" component={Qna} />
          <Route exact path="/info/qna/:id" component={QnaDetail} />
        </Switch>
      </div>
    </Container>
  );
};

export default Info;
