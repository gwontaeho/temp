import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import { Container, Header, Info, Button } from "./styles";

const UserInfoUpdate = (props) => {
  const auth = useSelector((state) => state.auth);

  const phoneRegExp = /^[0-9]{1,11}$/;

  const [data, setData] = useState(props.location.state.userData);
  const [phone, setPhone] = useState(props.location.state.userData.phone);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onClickModify = useCallback(async () => {
    if (!phoneRegExp.test(phone))
      return window.alert("연락처를 정확히 입력해주세요");

    const result = window.confirm("정보를 수정하시겠습니까?");
    if (result) {
      try {
        await axios.put(
          "/api/auth/user",
          { phone },
          {
            headers: {
              token: auth.token,
            },
          }
        );
        window.alert("정보가 수정되었습니다.");
        props.history.replace("/info");
      } catch (error) {
        console.log(error);
      }
    }
  }, [phone]);

  const onClickCancel = useCallback(() => {
    props.history.replace("/info");
  }, []);

  return (
    <Container>
      <Header>정보 수정</Header>
      <Info>
        <div>
          <div className="title">이름</div>
          <div>{data.name}</div>
        </div>
        <div>
          <div className="title">아이디</div>
          <div>{data.id}</div>
        </div>
        <div>
          <div className="title">연락처</div>
          <div>
            <input
              type="text"
              value={phone}
              onChange={onChangePhone}
              maxLength="11"
            />
          </div>
        </div>
        <div>
          <div className="title">성별</div>
          <div>{data.gender}</div>
        </div>
        <div>
          <div className="title">생년월일</div>
          <div>{data.birth}</div>
        </div>
      </Info>
      <Button>
        <div onClick={onClickModify}>수정하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Button>
    </Container>
  );
};

export default UserInfoUpdate;
