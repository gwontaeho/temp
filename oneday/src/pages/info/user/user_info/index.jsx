import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Header, Detail } from "./styles";

const UserInfo = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState({});

  useEffect(() => {
    requestUser();
  }, []);

  const requestUser = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/user",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Header>내 정보</Header>
      <Detail>
        <div className="detail">
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
            <div>{data.phone}</div>
          </div>
          <div>
            <div className="title">성별</div>
            <div>{data.gender}</div>
          </div>
          <div>
            <div className="title">생년월일</div>
            <div>{data.birth}</div>
          </div>
        </div>
        <div className="btns">
          <Link
            to={{
              pathname: "/info/modify",
              state: { type: props.type, data },
            }}
          >
            수정
          </Link>
        </div>
      </Detail>
    </Container>
  );
};

export default UserInfo;
