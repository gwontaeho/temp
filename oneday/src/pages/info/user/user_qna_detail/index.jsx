import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import {
  Container,
  ModalHeader,
  ModalText,
  Header,
  Nav,
  List,
  Item,
  Text,
} from "./styles";
Modal.setAppElement("#root");

const SellerQnaDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [qnaData, setQnaData] = useState({});
  const [question, setQuestion] = useState("");
  const [isOpend, setIsOpend] = useState(false);

  useEffect(() => {
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/qna/${props.match.params.id}`, {
        headers: { token: auth.token },
      });
      setQnaData(response.data);
      setQuestion(response.data.question);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickModify = useCallback(async () => {
    try {
      const response = await axios.put(
        "/api/qna",
        {
          id: qnaData.id,
          question,
        },
        { headers: { token: auth.token } }
      );
      requestQnaData();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }, [qnaData, question]);

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const onChangeQuestion = useCallback((e) => {
    setQuestion(e.target.value);
  }, []);

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
            fontSize: "1.3rem",
          },
        }}
      >
        <ModalHeader>
          <div>문의 수정</div>
          <div className="header-btns">
            <div onClick={onClickModify}>수정</div>
            <div onClick={closeModal}>닫기</div>
          </div>
        </ModalHeader>
        <ModalText>
          <textarea
            maxLength="200"
            rows="5"
            value={question}
            onChange={onChangeQuestion}
          />
        </ModalText>
      </Modal>
      <Header>문의 상세</Header>
      <Nav>
        {qnaData.state === 0 ? <div onClick={openModal}>문의 수정</div> : null}
      </Nav>
      <List>
        <Item>
          <div>클래스 명</div>
          <div>문의 일자</div>
          <div>답변 일자</div>
          <div>상태</div>
        </Item>
        <Item>
          <div>{`[${
            qnaData.product.category === "flower"
              ? "플라워"
              : qnaData.product.category === "art"
              ? "미술"
              : qnaData.product.category === "cooking"
              ? "요리"
              : qnaData.product.category === "handmade"
              ? "수공예"
              : qnaData.product.category === "activity"
              ? "액티비티"
              : "기타"
          }] ${qnaData.product.name}`}</div>
          <div>{qnaData.createdAt.substr(0, 10)}</div>
          {qnaData.state === 0 ? (
            <div></div>
          ) : (
            <div>{qnaData.updatedAt.substr(0, 10)}</div>
          )}
          <div>{qnaData.state === 0 ? "미답변" : "답변완료"}</div>
        </Item>
      </List>
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
