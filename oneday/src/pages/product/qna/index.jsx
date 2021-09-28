import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import axios from "axios";

import {
  Container,
  Header,
  QnaList,
  QnaItem,
  QnaTextarea,
  ModalHeader,
} from "./styles";

Modal.setAppElement("#root");

const Qna = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [isOpend, setIsOpend] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    console.log("-------------");
    console.log(props);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/qna/get", {
          classId: props.classId,
        });
        console.log(response.data);
        setQnaData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const onChangeQuestionText = useCallback((e) => {
    setQuestionText(e.target.value);
    console.log(e.target.value);
  }, []);

  const onClickSave = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/qna/add",
        {
          question: questionText,
          classId: props.classId,
          sellerId: props.sellerId,
        },
        { headers: { token: cookies.token } }
      );
      console.log(response.data);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, [props, questionText]);

  const qnaDataList = qnaData.map((v) => {
    return (
      <QnaItem>
        <div className="question">
          <div className="id">
            <div>{v.userId}</div>
            <div>{v.createdAt}</div>
          </div>
          <div>{v.question}</div>
        </div>

        {v.answer === null ? (
          <div className="answer">
            <div className="id">
              <div>{v.sellerId}</div>
              <div>{v.updatedAt}</div>
            </div>
            <div>test</div>
          </div>
        ) : null}
      </QnaItem>
    );
  });

  return (
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
          <div>문의 작성</div>
          <div className="header-btns">
            <div onClick={onClickSave}>저장</div>
            <div onClick={closeModal}>닫기</div>
          </div>
        </ModalHeader>
        <QnaTextarea>
          <textarea
            maxLength="200"
            rows="5"
            value={questionText}
            onChange={onChangeQuestionText}
          />
        </QnaTextarea>
      </Modal>
      <Header>
        <div>클래스 문의 (총 {qnaData.length}건)</div>
        {props.type === 1 ? (
          <div onClick={openModal}>문의하기</div>
        ) : (
          <div></div>
        )}
      </Header>
      <QnaList>{qnaDataList}</QnaList>
    </Container>
  );
};

export default Qna;
