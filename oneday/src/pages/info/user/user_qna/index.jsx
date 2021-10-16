import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { Container, Header, List, Item, QnaHeader } from "./styles";

const UserQna = () => {
  const auth = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [answerState, setAnswerState] = useState(2);
  const [qnaData, setQnaData] = useState({ count: 0, data: [] });

  const pageSelectRef = React.createRef();

  useEffect(() => {
    requestQnaData();
  }, [answerState, page]);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/qna/page?state=${answerState}&page=${page}`,
        { headers: { token: auth.token } }
      );

      let newPages = [];
      for (let i = 1; i <= Math.ceil(response.data.count / 5); i++) {
        newPages.push(i);
      }
      setPages(newPages);
      setQnaData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [answerState, page]);

  const onChangeAnswerState = useCallback(
    (e) => {
      setAnswerState(e.target.value);
      setPage(1);
      pageSelectRef.current.value = 1;
    },
    [pageSelectRef]
  );

  const onChangePage = useCallback((e) => {
    setPage(e.target.value);
  }, []);

  const pageList = pages.map((v) => {
    return (
      <option key={v} value={v}>
        {v} / {pages.length}
      </option>
    );
  });

  const qnaList = qnaData.data.map((v) => {
    const category =
      v.product.category === "flower"
        ? "플라워"
        : v.product.category === "art"
        ? "미술"
        : v.product.category === "cooking"
        ? "요리"
        : v.product.category === "handmade"
        ? "수공예"
        : v.product.category === "activity"
        ? "액티비티"
        : "기타";
    return (
      <Item key={v.id}>
        <div className="name">{`[${category}] ${v.product.name}`}</div>
        <div className="text">{v.createdAt.substr(0, 10)}</div>
        {v.state === 0 ? (
          <div></div>
        ) : (
          <div className="text">{v.updatedAt.substr(0, 10)}</div>
        )}
        <div className="text">{v.state === 0 ? "미 답변" : "답변 완료"}</div>
        <div className="text">
          <Link to={`/info/qna/${v.id}`}>자세히</Link>
        </div>
      </Item>
    );
  });

  return (
    <Container>
      <Header>문의 내역</Header>
      <Header>
        <div>{qnaData.count}건</div>
        <select onChange={onChangeAnswerState} defaultValue={2}>
          <option value={2}>전체</option>
          <option value={1}>답변완료</option>
          <option value={0}>미답변</option>
        </select>
        <select ref={pageSelectRef} onChange={onChangePage}>
          {pageList}
        </select>
      </Header>
      <QnaHeader>
        <div>클래스 명</div>
        <div>문의 일자</div>
        <div>답변 일자</div>
        <div>상태</div>
      </QnaHeader>
      <List>{qnaList}</List>
    </Container>
  );
};

export default UserQna;
