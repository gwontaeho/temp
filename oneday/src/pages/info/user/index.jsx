import React, { useState, useCallback, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { useSelector } from "react-redux";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import profile from "../../../images/profile/profile.png";

import {
  Container,
  Header,
  InfoContainer,
  Image,
  Info,
  History,
  Nav,
  RouteContainer,
} from "./styles";

const UserInfoUpdate = loadable(() => import("./user_info_update"));
const UserReservation = loadable(() => import("./user_reservation"));
const UserReservationDetail = loadable(() =>
  import("./user_reservation_detail")
);
const UserQna = loadable(() => import("./user_qna"));
const UserQnaDetail = loadable(() => import("./user_qna_detail"));
const UserReview = loadable(() => import("./user_review"));

const User = () => {
  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({});
  const [reservationCountData, setReservationCountData] = useState({});
  const [location, setLocation] = useState(0);

  useEffect(() => {
    console.log(auth);
    requestUserData();
    requestReservationCountData();
  }, []);

  const requestUserData = useCallback(async () => {
    try {
      const response = await axios.get("/api/auth/user", {
        headers: { token: auth.token },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestReservationCountData = useCallback(async () => {
    try {
      const response = await axios.get("/api/reservation/count", {
        headers: { token: auth.token },
      });
      setReservationCountData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const UserInfo = () => {
    return (
      <InfoContainer>
        <Image>
          <img
            src={
              userData.img === null
                ? profile
                : userData.img.replace(/\\/gi, "/").replace(/public/gi, "")
            }
          />
        </Image>
        <Info>
          <div className="id">{userData.id}</div>
          <Link to="/info/update">
            <EditOutlinedIcon />
            수정
          </Link>
        </Info>
        <History>
          <div>
            <div>
              <Link to="/info">진행중인 예약 ></Link>
            </div>
            <div>{reservationCountData.a}</div>
          </div>
          <div>
            <div>
              <Link to="/info/review/unwritten">후기 작성하기 ></Link>
            </div>
            <div>{reservationCountData.b}</div>
          </div>
        </History>
      </InfoContainer>
    );
  };

  return Object.keys(userData).length === 0 ? null : (
    <Container>
      <Nav>
        <Link
          to="/info"
          onClick={() => setLocation(0)}
          className={location === 0 ? "location" : ""}
        >
          예약 내역{location === 0 ? " >" : ""}
        </Link>
        <Link
          to="/info/qna"
          onClick={() => setLocation(1)}
          className={location === 1 ? "location" : ""}
        >
          문의 내역{location === 1 ? " >" : ""}
        </Link>
        <Link
          to="/info/review"
          onClick={() => setLocation(2)}
          className={location === 2 ? "location" : ""}
        >
          수강 후기{location === 2 ? " >" : ""}
        </Link>
      </Nav>
      <RouteContainer>
        <Header>내 정보</Header>
        <UserInfo />
        <Switch>
          <Route
            exact
            path="/info"
            render={(props) => (
              <UserReservation
                {...props}
                reservationCountData={reservationCountData}
              />
            )}
          />
          <Route
            exact
            path="/info/update"
            render={(props) => (
              <UserInfoUpdate
                {...props}
                userData={userData}
                requestUserData={requestUserData}
              />
            )}
          />
          <Route
            exact
            path="/info/reservation/:id"
            render={(props) => (
              <UserReservationDetail
                {...props}
                requestReservationCountData={requestReservationCountData}
              />
            )}
          />
          <Route exact path="/info/qna" component={UserQna} />
          <Route exact path="/info/qna/:id" component={UserQnaDetail} />
          <Route path="/info/review" component={UserReview} />
        </Switch>
      </RouteContainer>
    </Container>
  );
};

export default User;
