import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Container, Header, Info, UserInfo, Apply } from "./styles";
import { useSelector } from "react-redux";
import axios from "axios";

const Reservation = (props) => {
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({});
  const [productData, setProductData] = useState(
    props.location.state.productData
  );
  const [schedule, setSchedule] = useState(props.location.state.schedule);
  const [personnel, setPersonnel] = useState(props.location.state.personnel);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    requestUserData();
  }, []);

  const requestUserData = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/user",
        {},
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log(response.data);
      setUser(response.data);
      setName(response.data.name);
      setPhone(response.data.phone);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(productData);
    console.log(schedule);
    console.log(personnel);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onClickApply = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/reservation",
        {
          name,
          phone,
          personnel,
          productId: productData.id,
          sellerId: productData.sellerId,
          scheduleId: schedule.id,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) props.history.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, [productData, schedule, personnel, name, phone]);

  if (auth.type !== 1) {
    return <Redirect to="/" />;
  }

  return Object.keys(productData).length === 0 ? null : (
    <Container>
      <Header>예약 / 결제</Header>
      <Info>
        <img
          src={productData.img.replace(/\\/gi, "/").replace(/public/gi, "")}
        />
        <div>
          <div>{productData.name}</div>
          <div>{productData.sellerId}</div>
          <div>{personnel}</div>
          <div>{productData.price * personnel}</div>
        </div>
      </Info>
      <Header>예약자 정보</Header>
      <UserInfo>
        <label className="name">
          <div>이름</div>
          <input type="text" value={name} onChange={onChangeName} />
        </label>
        <label className="phone">
          <div>연락처</div>
          <input
            type="text"
            maxLength={11}
            value={phone}
            onChange={onChangePhone}
          />
        </label>
      </UserInfo>
      <Apply>
        <div onClick={onClickApply}>신청하기</div>
      </Apply>
    </Container>
  );
};

export default Reservation;
