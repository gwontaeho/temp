import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useCookies } from "react-cookie";

import {
  Container,
  Header,
  Qnas,
  QnaItem,
  ModalHeader,
  QnaTextarea,
} from "./styles";

Modal.setAppElement("#root");

const SellerQnaDetail = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [isOpend, setIsOpend] = useState(false);
  const [qnaData, setQnaData] = useState({});
  const [answerText, setAnswerText] = useState("");

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

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const onChangeAnserText = useCallback((e) => {
    setAnswerText(e.target.value);
    console.log(e.target.value);
  }, []);

  const onClickSave = useCallback(async () => {
    try {
      await axios.post(
        "/api/qna/answer",
        {
          answer: answerText,
          id: qnaData.id,
        },
        { headers: { token: cookies.token } }
      );
      closeModal();
      getQnaDetail();
    } catch (error) {
      console.log(error);
    }
  }, [qnaData, answerText]);

  return Object.keys(qnaData).length === 0 ? null : (
    <Container>
      <Modal
        isOpen={isOpend}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            width: "720px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <ModalHeader>
          <div>문의 답변</div>
          <div className="header-btns">
            <div onClick={onClickSave}>저장</div>
            <div onClick={closeModal}>닫기</div>
          </div>
        </ModalHeader>
        <QnaTextarea>
          <textarea
            maxLength="200"
            rows="5"
            value={answerText}
            onChange={onChangeAnserText}
          />
        </QnaTextarea>
      </Modal>
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
          <div className="answer" onClick={openModal}>
            {qnaData.state === 0 ? "답변하기" : null}
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
