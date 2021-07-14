import { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import loadable from "@loadable/component";
import axios from "axios";
import { Container, Nav } from "./styles";

const Modify = loadable(() => import("./common/modify"));
const History = loadable(() => import("./user/history"));
const HistoryDetail = loadable(() => import("./user/history_detail"));
const Business = loadable(() => import("./seller/business"));
const Classes = loadable(() => import("./seller/classes"));
const Reservations = loadable(() => import("./seller/reservations"));
const Create = loadable(() => import("./seller/create"));
const Class = loadable(() => import("./seller/class"));

const Info = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [type, setType] = useState(0);

  useEffect(() => {
    console.log(cookies);

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
        <Link to="/info/modify">회원정보수정</Link>
        {type === 1 ? (
          <>
            <Link to="/info/history">예약 내역</Link>
          </>
        ) : null}
        {type === 2 ? (
          <>
            <Link to="/info/business">업체관리</Link>
            <Link to="/info/classes">클래스관리</Link>
            <Link to="/info/reservations">예약관리</Link>
          </>
        ) : null}
      </Nav>
      <div className="routes">
        <Switch>
          <Route path="/info/modify" component={Modify} />
          <Route exact path="/info/history" component={History} />
          <Route path="/info/history/:id" component={HistoryDetail} />
          <Route path="/info/business" component={Business} />
          <Route path="/info/classes" component={Classes} />
          <Route path="/info/reservations" component={Reservations} />
          <Route path="/info/create" component={Create} />
          <Route path="/info/class/:index" component={Class} />
        </Switch>
      </div>
    </Container>
  );
};

export default Info;
