import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Container, Header, Qnas, QnaItem } from "./styles";

const SellerQna = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [answerState, setAnswerState] = useState(2);
  const [qnaData, setQnaData] = useState({ count: 0, data: [] });

  const pageSelectRef = React.createRef();

  useEffect(() => {
    requestQna();
  }, [answerState, page]);

  const requestQna = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/qna/seller",
        {
          answerState,
          page,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
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
      <option value={v}>
        {v} / {pages.length}
      </option>
    );
  });

  const qnaList = qnaData.data.map((v) => {
    return (
      <QnaItem>
        <div className="name">{v.userId}</div>
        <div className="class">{v.product.name}</div>
        <div className="date">{v.createdAt.substr(0, 10)}</div>
        {v.state === 0 ? (
          <div className="date"></div>
        ) : (
          <div className="date">{v.updatedAt.substr(0, 10)}</div>
        )}
        <div className="state">{v.state === 0 ? "미답변" : "답변완료"}</div>
        <Link to={`/info/qna/${v.id}`}>상세</Link>
      </QnaItem>
    );
  });

  return (
    <Container>
      <Header>문의 관리</Header>
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
      <Qnas>
        <QnaItem>
          <div className="name">작성자</div>
          <div className="class">클래스 명</div>
          <div className="date">문의일자</div>
          <div className="date">답변일자</div>
          <div className="state">상태</div>
        </QnaItem>
        {qnaList}
      </Qnas>
    </Container>
  );
};

export default SellerQna;
