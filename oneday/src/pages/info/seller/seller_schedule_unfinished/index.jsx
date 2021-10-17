import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { Container, Header, ListHeader, List, Item } from "./styles";

const SellerScheduleUnfinished = (props) => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(props);
  }, []);

  const onClickEnd = useCallback(async (id) => {
    const result = window.confirm("일정을 종료하시겠습니까?");

    if (result) {
      try {
        const response = await axios.put(
          "/api/schedule",
          { id },
          { headers: { token: auth.token } }
        );
        console.log(response);
        props.requestUnfinishedScheduleData(auth);
        window.alert("일정이 종료되었습니다.");
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const scheduleList = props.unfinishedScheduleData.map((v) => {
    return (
      <Item key={v.id}>
        <div>{v.product.name}</div>
        <div>
          {String(v.ymd).substr(0, 4) +
            ". " +
            String(v.ymd).substr(4, 2) +
            ". " +
            String(v.ymd).substr(6, 2)}
        </div>
        <div>
          {v.reserved} / {v.personnel}
        </div>
        <div>
          <div className="end" onClick={() => onClickEnd(v.id)}>
            종료
          </div>
        </div>
        <div>
          <Link to={`/info/schedule/${v.id}`}>자세히</Link>
        </div>
      </Item>
    );
  });

  return (
    <Container>
      <Header>미종료 일정</Header>
      <ListHeader>
        <div>클래스 이름</div>
        <div>수강 일자</div>
        <div>수강 인원</div>
      </ListHeader>
      <List>{scheduleList}</List>
    </Container>
  );
};

export default SellerScheduleUnfinished;
