import { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import loadable from "@loadable/component";
import axios from "axios";
import { Container, Header, Section, InfoContainer } from "./styles";

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
          <Link to="/info">내 정보</Link>
        </div>
        <div>
          <Link to="/info/modifyinfo">회원정보수정</Link>
        </div>
        {userType == 1 ? <Link to="/info/checkbooking">예약확인</Link> : null}
        {userType == 2 ? (
          <>
            <div>
              <Link to="/info/managebusiness">업체관리</Link>
            </div>
            <div>
              <Link to="/info/manageclass">클래스관리</Link>
            </div>
            <div>
              <Link to="/info/managebooking">예약관리</Link>
            </div>
          </>
        ) : null}
      </InfoContainer>
    );
  };

  return (
    <Container>
      <Header>
        {window.location.pathname === "/info" ? <div>내 정보</div> : null}
        {window.location.pathname === "/info/modifyinfo" ? (
          <div>회원정보수정</div>
        ) : null}
        {window.location.pathname === "/info/checkbooking" ? (
          <div>예약확인</div>
        ) : null}
        {window.location.pathname === "/info/managebusiness" ? (
          <div>업체관리</div>
        ) : null}
        {window.location.pathname === "/info/manageclass" ? (
          <div>클래스관리</div>
        ) : null}
        {window.location.pathname === "/info/managebooking" ? (
          <div>예약관리</div>
        ) : null}
        {window.location.pathname === "/info/createclass" ? (
          <div>클래스생성</div>
        ) : null}
        {window.location.pathname.includes("/info/classinfo") ? (
          <div>클래스정보</div>
        ) : null}
      </Header>
      <Section>
        <Index />
        <div className="route">
          <Switch>
            <Route path="/info/modifyinfo" component={ModifyInfo} />
            <Route path="/info/checkbooking" component={CheckBooking} />
            <Route path="/info/managebusiness" component={ManageBusiness} />
            <Route path="/info/manageclass" component={ManageClass} />
            <Route path="/info/managebooking" component={ManageBooking} />
            <Route path="/info/createclass" component={CreateClass} />
            <Route path="/info/classinfo/:index" component={ClassInfo} />
          </Switch>
        </div>
      </Section>
    </Container>
  );
};

export default Info;
