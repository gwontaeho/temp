import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { useSelector } from "react-redux";

import {
  Container,
  Header,
  Qnas,
  QnaItem,
  Text,
  ModalHeader,
  ModalBox,
} from "./styles";

const SellerQnaDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
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

  const requestUpdateQna = useCallback(async () => {
    try {
      await axios.put(
        "/api/qna/answer",
        {
          answer: answerText,
          id: qnaData.id,
        },
        { headers: { token: auth.token } }
      );
      props.requestUnansweredQnaData(auth);
      requestQnaData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [qnaData, answerText]);

  return Object.keys(qnaData).length === 0 ? null : (
    <Container>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setAnswerText("");
        }}
      >
        <Box sx={ModalBox}>
          <ModalHeader>
            <div>답변작성</div>
            <div className="buttons">
              <div
                onClick={() => {
                  requestUpdateQna();
                  setOpen(false);
                  setAnswerText("");
                }}
              >
                저장
              </div>
              <div
                onClick={() => {
                  setOpen(false);
                  setAnswerText("");
                }}
              >
                취소
              </div>
            </div>
          </ModalHeader>
          <TextField
            maxlength={60}
            fullWidth
            multiline
            maxRows={4}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
        </Box>
      </Modal>

      <Header>문의 상세</Header>
      <Qnas>
        <QnaItem>
          <div>클래스 명</div>
          <div>작성자</div>
          <div>문의일자</div>
          <div>답변일자</div>
          <div>상태</div>
        </QnaItem>
        <QnaItem>
          <div className="product_info">{`[${qnaData.product.category}] ${qnaData.product.name}`}</div>
          <div>{qnaData.userId}</div>
          <div>{qnaData.createdAt.substr(0, 10)}</div>
          {qnaData.state === 0 ? (
            <div></div>
          ) : (
            <div>{qnaData.updatedAt.substr(0, 10)}</div>
          )}
          <div>{qnaData.state === 0 ? "미답변" : "답변완료"}</div>
          {qnaData.state === 0 ? (
            <div onClick={() => setOpen(true)} className="answer">
              "답변하기"
            </div>
          ) : null}
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
