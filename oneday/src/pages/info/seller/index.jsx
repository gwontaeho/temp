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
const SellerQna = loadable(() => import("./seller_qna"));
const SellerQnaDetail = loadable(() => import("./seller_qna_detail"));

const Seller = () => {
  const auth = useSelector((state) => state.auth);

  const [sellerData, setSellerData] = useState({});
  const [reservationCountData, setReservationCountData] = useState({});

  useEffect(() => {
    requestSellerData();
  }, []);

  useEffect(() => {
    requestReservationCountData();
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
            <div>1</div>
          </div>
          <div>
            <div>미 종료 일정</div>
            <div>1</div>
          </div>
          <div>
            <div>미 답변 문의</div>
            <div>1</div>
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
