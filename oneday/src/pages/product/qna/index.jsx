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
  const [question, setQuestion] = useState("");
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    console.log(props.type);
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    console.log("abc");
    try {
      const response = await axios.get(`/api/qna?productId=${props.productId}`);
      console.log(response.data);
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const requsetCreateQuestion = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/qna/question",
        {
          question,
          productId: props.productId,
          sellerId: props.sellerId,
        },
        { headers: { token: cookies.token } }
      );
      requestQnaData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [question]);

  const onClickSave = useCallback(() => {
    requsetCreateQuestion();
    closeModal();
  }, [question]);

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const onChangeQuestion = useCallback((e) => {
    setQuestion(e.target.value);
  }, []);

  const qnaDataList = qnaData.map((v) => {
    return (
      <QnaItem>
        <div className="question">
          <div className="id">
            <div>{v.userId}</div>
            <div>
              {new Date(v.createdAt).getFullYear() +
                " / " +
                (new Date(v.createdAt).getMonth() + 1) +
                " / " +
                new Date(v.createdAt).getDate()}
            </div>
          </div>
          <div>{v.question}</div>
        </div>

        {v.answer === null ? (
          <div className="answer">
            <div className="id">
              <div>{v.sellerId}</div>
              <div>
                {new Date(v.updatedAt).getFullYear() +
                  " / " +
                  (new Date(v.updatedAt).getMonth() + 1) +
                  " / " +
                  new Date(v.updatedAt).getDate()}
              </div>
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
            value={question}
            onChange={onChangeQuestion}
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
