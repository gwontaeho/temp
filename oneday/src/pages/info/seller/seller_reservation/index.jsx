import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { Container, Nav, List, Item } from "./styles";

const SellerReservation = (props) => {
  const auth = useSelector((state) => state.auth);

  const [reservationData, setReservationData] = useState([]);

  const requestReservationData = useCallback(async (state) => {
    try {
      const response = await axios.get(`/api/reservation?state=${state}`, {
        headers: { token: auth.token },
      });
      console.log(response.data);
      setReservationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickItem = useCallback((v) => {
    console.log(v);
  }, []);

  const reservationList = reservationData.map((v) => {
    const ymd =
      new Date(v.createdAt).getFullYear() +
      ". " +
      (new Date(v.createdAt).getMonth() + 1) +
      ". " +
      new Date(v.createdAt).getDate();
    return (
      <Link to={`/info/reservation/${v.id}`}>
        <Item onClick={() => onClickItem(v)}>
          <div>
            <img
              src={v.product.img.replace(/\\/gi, "/").replace(/public/gi, "")}
            />
          </div>

          <div>{v.product.name}</div>
          <div>{ymd}</div>
        </Item>
      </Link>
    );
  });

  return (
    <Container>
      <Nav>
        <div onClick={() => requestReservationData(4)}>
          <div>예약 대기</div>
          <div>{props.reservationCountData.e}</div>
        </div>
        <div onClick={() => requestReservationData(0)}>
          <div>예약 중</div>
          <div>{props.reservationCountData.a}</div>
        </div>
        <div onClick={() => requestReservationData(1)}>
          <div>수강 완료</div>
          <div>
            {props.reservationCountData.b + props.reservationCountData.f}
          </div>
        </div>
        <div onClick={() => requestReservationData(2)}>
          <div>취소 요청</div>
          <div>{props.reservationCountData.c}</div>
        </div>
        <div onClick={() => requestReservationData(3)}>
          <div>취소</div>
          <div>{props.reservationCountData.d}</div>
        </div>
      </Nav>
      <List>{reservationList}</List>
    </Container>
  );
};

export default SellerReservation;
