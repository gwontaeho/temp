import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { Container, Header, Qnas, QnaItem } from "./styles";

const SellerQna = () => {
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
    return (
      <QnaItem key={v.id}>
        <div>{v.product.name}</div>
        <div>{v.userId}</div>
        <div>{v.createdAt.substr(0, 10)}</div>
        {v.state === 0 ? <div></div> : <div>{v.updatedAt.substr(0, 10)}</div>}
        <div>{v.state === 0 ? "미답변" : "답변완료"}</div>
        <div>
          <Link to={`/info/qna/${v.id}`}>자세히</Link>
        </div>
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
          <div>클래스 명</div>
          <div>작성자</div>
          <div>문의일자</div>
          <div>답변일자</div>
          <div>상태</div>
        </QnaItem>
        {qnaList}
      </Qnas>
    </Container>
  );
};

export default SellerQna;
