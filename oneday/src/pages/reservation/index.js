import { Container, Header, Info, UserInfo, Apply } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import axios from "axios";

const Reservation = ({ location, history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState({});
  const [classData, setClassData] = useState(location.state.classData);
  const [schedule, setSchedule] = useState(location.state.schedule);
  const [personnel, setPersonnel] = useState(location.state.personnel);
  const [reservationName, setReservationName] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");

  useEffect(async () => {
    try {
      const response = await axios.post(
        "/api/auth/user",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      console.log(response.data);
      setUser(response.data);
      setReservationName(response.data.name);
      setReservationPhone(response.data.phone);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(classData);
    console.log(schedule);
    console.log(personnel);
  }, []);

  const onChangeReservationName = useCallback((e) => {
    setReservationName(e.target.value);
  }, []);

  const onChangeReservationPhone = useCallback((e) => {
    setReservationPhone(e.target.value);
  }, []);

  const onClickApply = useCallback(async () => {
    console.log(classData);
    try {
      const response = await axios.post(
        "/api/reservation",
        {
          classId: classData.id,
          scheduleId: schedule.id,
          sellerId: classData.sellerId,
          personnel,
          name: reservationName,
          phone: reservationPhone,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      if (response.status === 200) {
        window.alert("예약 되었습니다.");
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [classData, schedule, personnel, reservationName, reservationPhone]);

  if (location.state == undefined) return <Redirect to="/" />;
  return (
    <Container>
      <Header>예약 / 결제</Header>
      <Info>
        <img
          src={
            classData.img
              ? classData.img.replace(/\\/gi, "/").replace(/public/gi, "")
              : null
          }
        />
        <div>
          <div>{classData.name}</div>
          <div>{classData.sellerId}</div>
          <div>{personnel}</div>
          <div>{classData.price * personnel}</div>
        </div>
      </Info>
      <Header>예약자 정보</Header>
      <UserInfo>
        <label className="name">
          <div>이름</div>
          <input
            type="text"
            value={reservationName}
            onChange={onChangeReservationName}
          />
        </label>
        <label className="phone">
          <div>연락처</div>
          <input
            type="text"
            maxLength={11}
            value={reservationPhone}
            onChange={onChangeReservationPhone}
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
