import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

import { Container, Header, List, Item } from "./styles";

const History = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [ing, setIng] = useState([]);
  const [past, setPast] = useState([]);
  const [request, setRequest] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/history",
          {},
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        let newIng = [];
        let newPast = [];
        let newRequest = [];
        let newCancled = [];
        response.data.map((v) => {
          if (v.state === 0) {
            newIng.push(v);
          } else if (v.state === 1) {
            newPast.push(v);
          } else if (v.state === 2) {
            newRequest.push(v);
          } else if (v.state === 3) {
            newCancled.push(v);
          }
        });
        setIng(newIng);
        setPast(newPast);
        setRequest(newRequest);
        setCanceled(newCancled);
        setSelected(newIng);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onClickState = useCallback(
    (v) => {
      if (v === 0) {
        setSelected(ing);
      } else if (v === 1) {
        setSelected(past);
      } else if (v === 2) {
        setSelected(request);
      } else if (v === 3) {
        setSelected(canceled);
      }
    },
    [ing, past, request, canceled]
  );

  const onClickItem = useCallback((v) => {
    console.log(v);
  }, []);

  const selectedList = selected.map((v) => {
    const ymd =
      new Date(v.createdAt).getFullYear() +
      ". " +
      (new Date(v.createdAt).getMonth() + 1) +
      ". " +
      new Date(v.createdAt).getDate();
    return (
      <Link to={`/info/history/${v.id}`}>
        <Item onClick={() => onClickItem(v)}>
          <div>
            <img
              src={v.class.img.replace(/\\/gi, "/").replace(/public/gi, "")}
            />
          </div>

          <div>{v.class.name}</div>
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
            ) : (
              "취소"
            )}
          </div>
        </Item>
      </Link>
    );
  });

  return (
    <Container>
      <Header>
        <div onClick={() => onClickState(0)}>
          <div>예약 중</div>
          <div>{ing.length}</div>
        </div>
        <div onClick={() => onClickState(1)}>
          <div>수강 완료</div>
          <div>{past.length}</div>
        </div>
        <div onClick={() => onClickState(2)}>
          <div>취소 요청</div>
          <div>{request.length}</div>
        </div>
        <div onClick={() => onClickState(3)}>
          <div>취소</div>
          <div>{canceled.length}</div>
        </div>
      </Header>
      <List>{selectedList}</List>
    </Container>
  );
};

export default History;
