import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

import { Container, Header, List, Item } from "./styles";

const UserReservation = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [waiting, setWaiting] = useState([]);
  const [ing, setIng] = useState([]);
  const [past, setPast] = useState([]);
  const [request, setRequest] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    requestReservationData();
  }, []);

  const requestReservationData = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/reservation/user",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      let newWaiting = [];
      let newIng = [];
      let newPast = [];
      let newRequest = [];
      let newCancled = [];
      response.data.forEach((v) => {
        if (v.state === 0) {
          newIng.push(v);
        } else if (v.state === 1) {
          newPast.push(v);
        } else if (v.state === 2) {
          newRequest.push(v);
        } else if (v.state === 3) {
          newCancled.push(v);
        } else if (v.state === 4) {
          newWaiting.push(v);
        }
      });
      setWaiting(newWaiting);
      setIng(newIng);
      setPast(newPast);
      setRequest(newRequest);
      setCanceled(newCancled);
      setSelected(newIng);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const selectedList = selected.map((v) => {
    const ymd =
      new Date(v.createdAt).getFullYear() +
      ". " +
      (new Date(v.createdAt).getMonth() + 1) +
      ". " +
      new Date(v.createdAt).getDate();
    return (
      <Link to={`/info/reservation/${v.id}`}>
        <Item>
          <div>
            <img
              src={v.product.img.replace(/\\/gi, "/").replace(/public/gi, "")}
            />
          </div>

          <div>{v.product.name}</div>
          <div>{ymd}</div>
          <div>
            {v.state === 0 ? (
              "예약 중"
            ) : v.state === 1 && v.review === null ? (
              <>
                <div>수강 완료</div>
                <div>리뷰를 작성해 주세요</div>
              </>
            ) : v.state === 1 && v.review !== null ? (
              "수강 완료"
            ) : v.state === 2 ? (
              "취소 요청"
            ) : v.state === 3 ? (
              "취소"
            ) : (
              "예약 대기"
            )}
          </div>
        </Item>
      </Link>
    );
  });

  return (
    <Container>
      <Header>
        <div onClick={() => setSelected(waiting)}>
          <div>예약 대기</div>
          <div>{waiting.length}</div>
        </div>
        <div onClick={() => setSelected(ing)}>
          <div>예약 중</div>
          <div>{ing.length}</div>
        </div>
        <div onClick={() => setSelected(past)}>
          <div>수강 완료</div>
          <div>{past.length}</div>
        </div>
        <div onClick={() => setSelected(request)}>
          <div>취소 요청</div>
          <div>{request.length}</div>
        </div>
        <div onClick={() => setSelected(canceled)}>
          <div>취소</div>
          <div>{canceled.length}</div>
        </div>
      </Header>
      <List>{selectedList}</List>
    </Container>
  );
};

export default UserReservation;
