import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Profile from "../../../images/profile/profile.png";

import { Container, Header, List, Item, ModalBox, ModalHeader } from "./styles";

const Qna = (props) => {
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

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
      props.requestQnaData(props.productId);
    } catch (error) {
      console.log(error);
    }
  }, [question]);

  const qnaDataList = props.qnaData.map((v) => {
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
                v.seller.img === null
                  ? Profile
                  : v.seller.img.replace(/\\/gi, "/").replace(/public/gi, "")
              }
            />
            <div>
              <div>{v.seller.company}</div>
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
        open={open}
        onClose={() => {
          setOpen(false);
          setQuestion("");
        }}
      >
        <Box sx={ModalBox}>
          <ModalHeader>
            <div>문의하기</div>
            <div className="buttons">
              <div
                onClick={() => {
                  requsetCreateQuestion();
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
      <Header>
        <div>클래스 문의 (총 {props.qnaData.length}건)</div>
        {auth.type === 1 ? (
          <div onClick={() => setOpen(true)}>문의하기</div>
        ) : (
          <div></div>
        )}
      </Header>
      <List>{qnaDataList}</List>
    </Container>
  );
};

export default Qna;
