import React, { useState, useEffect, useCallback } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
import profile from "../../../images/profile/profile.png";

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
  const [location, setLocation] = useState(0);

  useEffect(() => {
    requestSellerData();
    requestReservationCountData();
    requestUnfinishedScheduleData();
    requestUnansweredQnaData();
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

  const requestUnfinishedScheduleData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/schedule/unfinished?ymd=${todayYmd}`,
        {
          headers: { token: auth.token },
        }
      );
      setUnfinishedScheduleData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestUnansweredQnaData = useCallback(async () => {
    try {
      const response = await axios.get("/api/qna/unanswered", {
        headers: { token: auth.token },
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
              sellerData.img === null || sellerData.img === "null"
                ? profile
                : sellerData.img.replace(/\\/gi, "/").replace(/public/gi, "")
            }
          />
        </Image>
        <Info>
          <div className="id">{sellerData.id}</div>
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
        <Link
          to="/info"
          onClick={() => setLocation(0)}
          className={location === 0 ? "location" : ""}
        >
          예약 관리{location === 0 ? " >" : ""}
        </Link>
        <Link
          to="/info/schedule"
          onClick={() => setLocation(1)}
          className={location === 1 ? "location" : ""}
        >
          일정 관리{location === 1 ? " >" : ""}
        </Link>
        <Link
          to="/info/qna"
          onClick={() => setLocation(2)}
          className={location === 2 ? "location" : ""}
        >
          문의 관리{location === 2 ? " >" : ""}
        </Link>
        <Link
          to="/info/product"
          onClick={() => setLocation(3)}
          className={location === 3 ? "location" : ""}
        >
          클래스 관리{location === 3 ? " >" : ""}
        </Link>
      </Nav>
      <Routes>
        <Header>내 정보</Header>
        <SellerInfo />
        <Switch>
          <Route
            exact
            path="/info/update"
            render={(props) => (
              <SellerInfoUpdate
                {...props}
                requestSellerData={requestSellerData}
                sellerData={sellerData}
              />
            )}
          />
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
            render={(props) => (
              <SellerReservationDetail
                {...props}
                requestReservationCountData={requestReservationCountData}
              />
            )}
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
                requestReservationCountData={requestReservationCountData}
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
                requestReservationCountData={requestReservationCountData}
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
