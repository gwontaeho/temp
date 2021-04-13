import { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import loadable from "@loadable/component";
import axios from "axios";
import { Container, Header, InfoContainer } from "./styles";

const ModifyInfo = loadable(() => import("./modifyinfo"));
const CheckBooking = loadable(() => import("./checkbooking"));
const ManageBusiness = loadable(() => import("./managebusiness"));
const ManageClass = loadable(() => import("./manageclass"));
const ManageBooking = loadable(() => import("./managebooking"));
const CreateClass = loadable(() => import("./createclass"));
const ClassInfo = loadable(() => import("./classinfo"));

const Info = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userType, setUserType] = useState(1);

  useEffect(async () => {
    console.log(cookies);
    try {
      const response = await axios.post(
        "/api/user",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setUserType(response.data.type);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!cookies.token) {
    return <Redirect to="/" />;
  }

  const Index = () => {
    return (
      <InfoContainer>
        <div>
          <Link to="/info/modifyinfo">회원정보수정</Link>
          {userType == 1 ? <Link to="/info/checkbooking">예약확인</Link> : null}
        </div>
        {userType == 2 ? (
          <div>
            <Link to="/info/managebusiness">업체관리</Link>
            <Link to="/info/manageclass">클래스관리</Link>
            <Link to="/info/managebooking">예약관리</Link>
          </div>
        ) : null}
      </InfoContainer>
    );
  };

  return (
    <Container>
      <Header>
        회원정보
        {window.location.pathname === "/info/modifyinfo"
          ? "   회원정보수정"
          : null}
        {window.location.pathname === "/info/checkbooking"
          ? "  예약확인"
          : null}
        {window.location.pathname === "/info/managebusiness"
          ? "   업체관리"
          : null}
        {window.location.pathname === "/info/manageclass"
          ? "   클래스관리"
          : null}
        {window.location.pathname === "/info/managebooking"
          ? "   예약관리"
          : null}
        {window.location.pathname === "/info/createclass"
          ? "   클래스관리   클래스 생성"
          : null}
        {window.location.pathname === "/info/classinfo"
          ? "   클래스관리   클래스정보"
          : null}
      </Header>
      <Switch>
        <Route exact path="/info" component={Index} />
        <Route path="/info/modifyinfo" component={ModifyInfo} />
        <Route path="/info/checkbooking" component={CheckBooking} />
        <Route path="/info/managebusiness" component={ManageBusiness} />
        <Route path="/info/manageclass" component={ManageClass} />
        <Route path="/info/managebooking" component={ManageBooking} />
        <Route path="/info/createclass" component={CreateClass} />
        <Route path="/info/classinfo/:index" component={ClassInfo} />
      </Switch>
    </Container>
  );
};

export default Info;
