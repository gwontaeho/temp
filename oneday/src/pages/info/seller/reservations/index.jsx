import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import { Container, Header, List, Item } from "./styles";

const Reservation = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [ing, setIng] = useState([]);
  const [past, setPast] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.post(
        "/api/reservation/history/seller",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      let newIng = [];
      let newPast = [];
      let newCancled = [];
      response.data.map((v) => {
        if (v.state === 0) {
          newIng.push(v);
        } else if (v.state === 1) {
          newPast.push(v);
        } else if (v.state === 2) {
          newCancled.push(v);
        }
      });
      setIng(newIng);
      setPast(newPast);
      setCanceled(newCancled);
      setSelected(newIng);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickState = useCallback(
    (v) => {
      if (v === 0) {
        setSelected(ing);
      } else if (v === 1) {
        setSelected(past);
      } else if (v === 2) {
        setSelected(canceled);
      }
    },
    [ing, past, canceled]
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
      <Item onClick={() => onClickItem(v)}>
        <div>
          <img src={v.class.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        </div>

        <div>{v.class.name}</div>
        <div>{ymd}</div>
        <div>
          {v.state === 0 ? "예약 중" : v.state === 1 ? "수강 완료" : "취소"}
        </div>
      </Item>
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
          <div>취소</div>
          <div>{canceled.length}</div>
        </div>
      </Header>
      <List>{selectedList}</List>
    </Container>
  );
};

export default Reservation;
