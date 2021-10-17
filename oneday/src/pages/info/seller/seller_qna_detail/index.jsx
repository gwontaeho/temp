import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  Container,
  Header,
  Qnas,
  QnaItem,
  Text,
  ModalHeader,
  QnaTextarea,
} from "./styles";

Modal.setAppElement("#root");

const SellerQnaDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [isOpend, setIsOpend] = useState(false);
  const [qnaData, setQnaData] = useState({});
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/qna/${props.match.params.id}`, {
        headers: { token: auth.token },
      });
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
      await axios.put(
        "/api/qna/answer",
        {
          answer: answerText,
          id: qnaData.id,
        },
        { headers: { token: auth.token } }
      );
      closeModal();
      props.requestUnansweredQnaData(auth);
      requestQnaData();
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
          <div>작성자</div>
          <div>클래스 명</div>
          <div>문의일자</div>
          <div>답변일자</div>
          <div>상태</div>
        </QnaItem>
        <QnaItem>
          <div>{qnaData.userId}</div>
          <div>{qnaData.product.name}</div>
          <div>{qnaData.createdAt.substr(0, 10)}</div>
          {qnaData.state === 0 ? (
            <div></div>
          ) : (
            <div>{qnaData.updatedAt.substr(0, 10)}</div>
          )}
          <div>{qnaData.state === 0 ? "미답변" : "답변완료"}</div>
          <div onClick={openModal}>
            {qnaData.state === 0 ? "답변하기" : null}
          </div>
        </QnaItem>
      </Qnas>
      <Header>문의 내용</Header>
      <Text>{qnaData.question}</Text>
      {qnaData.answer === null ? null : (
        <>
          <Header>문의 답변</Header>
          <Text>{qnaData.answer}</Text>
        </>
      )}
    </Container>
  );
};

export default SellerQnaDetail;
