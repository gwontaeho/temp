import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import Profile from "../../../images/profile.png";

import { Container, Header, List, Item, ModalHeader } from "./styles";

Modal.setAppElement("#root");

const Qna = (props) => {
  const auth = useSelector((state) => state.auth);

  const [isOpend, setIsOpend] = useState(false);
  const [question, setQuestion] = useState("");
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/qna?productId=${props.productId}`);
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const requsetCreateQuestion = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/qna",
        {
          question,
          productId: props.productId,
          sellerId: props.sellerId,
        },
        { headers: { token: auth.token } }
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
      <Item key={v.id}>
        <div className="question">
          <img
            src={
              v.user.img === null
                ? Profile
                : v.user.img.replace(/\\/gi, "/").replace(/public/gi, "")
            }
          />
          <div>
            <div>{v.userId}</div>
            <div>
              {new Date(v.createdAt).getFullYear() +
                " / " +
                (new Date(v.createdAt).getMonth() + 1) +
                " / " +
                new Date(v.createdAt).getDate()}
            </div>
          </div>
          <div className="text">{v.question}</div>
        </div>

        {v.answer === null ? null : (
          <div className="answer">
            <img
              src={
                v.user.img === null
                  ? Profile
                  : v.user.img.replace(/\\/gi, "/").replace(/public/gi, "")
              }
            />
            <div>
              <div>{v.userId}</div>
              <div>
                {new Date(v.createdAt).getFullYear() +
                  " / " +
                  (new Date(v.createdAt).getMonth() + 1) +
                  " / " +
                  new Date(v.createdAt).getDate()}
              </div>
            </div>
            <div className="text">{v.question}</div>
          </div>
        )}
      </Item>
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
        <Item>
          <textarea
            maxLength="200"
            rows="5"
            value={question}
            onChange={onChangeQuestion}
          />
        </Item>
      </Modal>
      <Header>
        <div>클래스 문의 (총 {qnaData.length}건)</div>
        {props.type === 1 ? (
          <div onClick={openModal}>문의하기</div>
        ) : (
          <div></div>
        )}
      </Header>
      <List>{qnaDataList}</List>
    </Container>
  );
};

export default Qna;
