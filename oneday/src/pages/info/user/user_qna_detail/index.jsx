import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Container, Header, Qnas, QnaItem } from "./styles";

const SellerQnaDetail = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [qnaData, setQnaData] = useState({});

  useEffect(() => {
    getQnaDetail();
  }, []);

  const getQnaDetail = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/qna/detail",
        {
          id: props.match.params.id,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setQnaData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return Object.keys(qnaData).length === 0 ? null : (
    <Container>
      <Header>문의 상세</Header>
      <Qnas>
        <QnaItem>
          <div className="name">작성자</div>
          <div className="class">클래스 명</div>
          <div className="date">문의일자</div>
          <div className="date">답변일자</div>
          <div className="state">상태</div>
        </QnaItem>
        <QnaItem>
          <div className="name">{qnaData.userId}</div>
          <div className="class">{qnaData.class.name}</div>
          <div className="date">{qnaData.createdAt.substr(0, 10)}</div>
          {qnaData.state === 0 ? (
            <div className="date"></div>
          ) : (
            <div className="date">{qnaData.updatedAt.substr(0, 10)}</div>
          )}
          <div className="state">
            {qnaData.state === 0 ? "미답변" : "답변완료"}
          </div>
        </QnaItem>
      </Qnas>
      <Header>문의 내용</Header>
      <div>{qnaData.question}</div>
      {qnaData.answer === null ? null : (
        <>
          <Header>문의 답변</Header>
          <div>{qnaData.answer}</div>
        </>
      )}
    </Container>
  );
};

export default SellerQnaDetail;
