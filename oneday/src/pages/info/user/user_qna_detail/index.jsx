import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import {
  Container,
  ModalHeader,
  Header,
  Nav,
  List,
  Item,
  Text,
  ModalBox,
} from "./styles";

const SellerQnaDetail = (props) => {
  const auth = useSelector((state) => state.auth);

  const [qnaData, setQnaData] = useState({});
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);

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

  const requestUpdateQuestion = useCallback(async () => {
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
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [qnaData, question]);

  return Object.keys(qnaData).length === 0 ? null : (
    <Container>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setQuestion("");
        }}
      >
        <Box sx={ModalBox}>
          <ModalHeader>
            <div>문의수정</div>
            <div className="buttons">
              <div
                onClick={() => {
                  requestUpdateQuestion();
                  setOpen(false);
                  setQuestion("");
                }}
              >
                저장
              </div>
              <div
                onClick={() => {
                  setOpen(false);
                  setQuestion("");
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
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
      </Modal>
      <Header>문의 상세</Header>
      <Nav>
        {qnaData.state === 0 ? (
          <div onClick={() => setOpen(true)}>문의 수정</div>
        ) : null}
      </Nav>
      <List>
        <Item>
          <div>클래스 명</div>
          <div>문의 일자</div>
          <div>답변 일자</div>
          <div>상태</div>
        </Item>
        <Item>
          <div className="propduct_info">{`[${qnaData.product.category}] ${qnaData.product.name}`}</div>
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
