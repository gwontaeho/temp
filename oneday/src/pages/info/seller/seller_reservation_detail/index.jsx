import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Header,
  Nav,
  InfoHeader,
  Info,
  UserNLocation,
  User,
  Location,
  Map,
} from "./styles";
import { useSelector } from "react-redux";

import axios from "axios";

const { kakao } = window;
const SellerReservationDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [reservationData, setReservationData] = useState({});

  useEffect(() => {
    requestReservationData();
  }, []);

  const renderMap = useCallback((address, name) => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address.split("&")[1], (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        let marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        let infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    });
  }, []);

  const requestReservationData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/reservation/${props.match.params.id}`,
        { headers: { token: auth.token } }
      );
      console.log(response.data);
      setReservationData(response.data);
      renderMap(response.data.product.address, response.data.product.name);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickConfirm = useCallback(async () => {
    const result = window.confirm("예약을 확정하시겠습니까?");

    if (result) {
      try {
        const response = await axios.put(
          "/api/reservation",
          {
            id: reservationData.id,
          },
          {
            headers: {
              token: auth.token,
            },
          }
        );
        window.alert("예약이 확정되었습니다.");
        requestReservationData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [reservationData]);

  const onClickCancel = useCallback(async () => {
    const result = window.confirm("예약을 취소하시겠습니까?");
    if (result) {
      try {
        const response = await axios.put(
          "/api/reservation/cancel",
          {
            id: reservationData.id,
          },
          {
            headers: {
              token: auth.token,
            },
          }
        );
        window.alert("예약이 취소되었습니다.");
        requestReservationData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [reservationData]);

  return Object.keys(reservationData).length === 0 ? null : (
    <Container>
      <Header>예약 상세 내역</Header>
      <Nav>
        {reservationData.state === 4 ? (
          <div onClick={onClickConfirm}>예약 확정</div>
        ) : null}
        {reservationData.state === 2 || reservationData.state === 4 ? (
          <div onClick={onClickCancel}>예약 취소</div>
        ) : null}
      </Nav>
      <InfoHeader>
        <div>클래스 정보</div>
        <div>수강 일자</div>
        <div>예약 일자</div>
        <div>예약 인원</div>
        <div>예약 상태</div>
      </InfoHeader>
      <Info>
        <div className="info">
          <img
            src={reservationData.product.img
              .replace(/\\/gi, "/")
              .replace(/public/gi, "")}
          />
          <div>
            <div>{reservationData.product.category}</div>
            <div>{reservationData.product.name}</div>
          </div>
        </div>
        <div className="classDate">
          <div>
            {String(reservationData.schedule.ymd).substr(0, 4) +
              ". " +
              String(reservationData.schedule.ymd).substr(4, 2) +
              ". " +
              String(reservationData.schedule.ymd).substr(6, 2)}
          </div>
          <div>
            {reservationData.schedule.start.substr(0, 2) +
              ":" +
              reservationData.schedule.start.substr(2, 2) +
              " ~ " +
              reservationData.schedule.end.substr(0, 2) +
              ":" +
              reservationData.schedule.end.substr(2, 2)}
          </div>
        </div>
        <div className="text">
          {reservationData.createdAt.substr(0, 4) +
            ". " +
            reservationData.createdAt.substr(5, 2) +
            ". " +
            reservationData.createdAt.substr(8, 2)}
        </div>
        <div className="text">{reservationData.personnel}</div>
        <div className="text">
          {reservationData.state === 0
            ? "예약 중"
            : reservationData.state === 1
            ? "수강 완료"
            : reservationData.state === 2
            ? "취소 요청"
            : reservationData.state === 3
            ? "취소"
            : "예약 대기"}
        </div>
      </Info>
      <UserNLocation>
        <User>
          <Header>예약자 정보</Header>
          <div>
            <div className="title">이름</div>
            <div>{reservationData.name}</div>
          </div>
          <div>
            <div className="title">연락처</div>
            <div>{reservationData.phone}</div>
          </div>
        </User>
        <Location>
          <Header>위치 정보</Header>
          <Map>
            <div id="map" />
          </Map>
          <div className="address">
            {reservationData.product.address.split("&")[1] +
              " " +
              reservationData.product.address.split("&")[2]}
          </div>
        </Location>
      </UserNLocation>
    </Container>
  );
};

export default SellerReservationDetail;
