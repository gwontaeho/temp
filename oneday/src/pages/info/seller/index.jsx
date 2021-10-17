import React, { useState, useEffect, useCallback } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";
import axios from "axios";

import {
  Container,
  InfoContainer,
  Image,
  Info,
  History,
  Header,
  Nav,
  Routes,
} from "./styles";
import profile from "../../../images/profile.png";

const SellerInfoUpdate = loadable(() => import("./seller_info_update"));
const SellerProduct = loadable(() => import("./seller_product"));
const SellerProductCreate = loadable(() => import("./seller_product_create"));
const SellerProductDetail = loadable(() => import("./seller_product_detail"));
const SellerProductUpdate = loadable(() => import("./seller_product_update"));
const SellerReservation = loadable(() => import("./seller_reservation"));
const SellerReservationDetail = loadable(() =>
  import("./seller_reservation_detail")
);
const SellerSchedule = loadable(() => import("./seller_schedule"));
const SellerScheduleDetail = loadable(() => import("./seller_schedule_detail"));
const SellerScheduleUnfinished = loadable(() =>
  import("./seller_schedule_unfinished")
);
const SellerQna = loadable(() => import("./seller_qna"));
const SellerQnaDetail = loadable(() => import("./seller_qna_detail"));

const Seller = () => {
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : String(today.getMonth() + 1)
    ) +
    String(
      today.getDate() + 1 < 10
        ? "0" + String(today.getDate())
        : String(today.getDate())
    );

  const auth = useSelector((state) => state.auth);

  const [sellerData, setSellerData] = useState({});
  const [reservationCountData, setReservationCountData] = useState({});
  const [unfinishedScheduleData, setUnfinishedScheduleData] = useState([]);
  const [unansweredQnaData, setUnansweredQnaData] = useState([]);

  useEffect(() => {
    requestSellerData();
    console.log(todayYmd);
  }, []);

  useEffect(() => {
    requestReservationCountData();
    requestUnfinishedScheduleData(auth);
    requestUnansweredQnaData(auth);
  }, []);

  const requestSellerData = useCallback(async () => {
    try {
      const response = await axios.get("/api/auth/seller", {
        headers: { token: auth.token },
      });
      setSellerData(response.data);
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestUnfinishedScheduleData = useCallback(async (v) => {
    try {
      const response = await axios.get(
        `/api/schedule/unfinished?ymd=${todayYmd}`,
        {
          headers: { token: v.token },
        }
      );
      setUnfinishedScheduleData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestUnansweredQnaData = useCallback(async (v) => {
    try {
      const response = await axios.get("/api/qna/unanswered", {
        headers: { token: v.token },
      });
      setUnansweredQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const SellerInfo = () => {
    return (
      <InfoContainer>
        <Image>
          <img
            src={
              sellerData.img === null
                ? profile
                : sellerData.img.replace(/\\/gi, "/").replace(/public/gi, "")
            }
          />
        </Image>
        <Info>
          <div className="id">{sellerData.id}</div>
          <Link
            to={{
              pathname: "/info/update",
              state: { sellerData },
            }}
          >
            수정
          </Link>
        </Info>
        <History>
          <div>
            <div>진행중인 예약</div>
            <div>{reservationCountData.a}</div>
          </div>
          <div>
            <div>
              <Link to="/info/schedule/unfinished">미종료 일정 ></Link>
            </div>
            <div>{unfinishedScheduleData.length}</div>
          </div>
          <div>
            <div>
              <Link to="/info/qna">미답변 문의 ></Link>
            </div>
            <div>{unansweredQnaData.length}</div>
          </div>
        </History>
      </InfoContainer>
    );
  };

  return Object.keys(sellerData).length === 0 ? null : (
    <Container>
      <Nav>
        <Link to="/info">예약 관리</Link>
        <Link to="/info/schedule">일정 관리</Link>
        <Link to="/info/qna">문의 관리</Link>
        <Link to="/info/product">클래스 관리</Link>
      </Nav>
      <Routes>
        <Header>내 정보</Header>
        <SellerInfo />
        <Switch>
          <Route exact path="/info/update" component={SellerInfoUpdate} />
          <Route exact path="/info/product" component={SellerProduct} />
          <Route
            exact
            path="/info/create"
            render={(props) => (
              <SellerProductCreate {...props} sellerData={sellerData} />
            )}
          />
          <Route
            exact
            path="/info/product/:id"
            component={SellerProductDetail}
          />
          <Route
            exact
            path="/info/product/update/:id"
            render={(props) => (
              <SellerProductUpdate {...props} sellerData={sellerData} />
            )}
          />
          <Route
            exact
            path="/info"
            render={(props) => (
              <SellerReservation
                {...props}
                reservationCountData={reservationCountData}
              />
            )}
          />
          <Route
            exact
            path="/info/reservation/:id"
            component={SellerReservationDetail}
          />
          <Route exact path="/info/schedule" component={SellerSchedule} />
          <Route
            exact
            path="/info/schedule/unfinished"
            render={(props) => (
              <SellerScheduleUnfinished
                {...props}
                unfinishedScheduleData={unfinishedScheduleData}
                requestUnfinishedScheduleData={requestUnfinishedScheduleData}
              />
            )}
          />
          <Route
            exact
            path="/info/schedule/:id"
            render={(props) => (
              <SellerScheduleDetail
                {...props}
                requestUnfinishedScheduleData={requestUnfinishedScheduleData}
              />
            )}
          />
          <Route exact path="/info/qna" component={SellerQna} />
          <Route
            exact
            path="/info/qna/:id"
            render={(props) => (
              <SellerQnaDetail
                {...props}
                requestUnansweredQnaData={requestUnansweredQnaData}
              />
            )}
          />
        </Switch>
      </Routes>
    </Container>
  );
};

export default Seller;
