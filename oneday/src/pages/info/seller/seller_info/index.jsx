import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Header, Info, Button } from "./styles";

const SellerInfo = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [data, setData] = useState({});

  useEffect(() => {
    requestSeller();
  }, []);

  const requestSeller = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/seller",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return Object.keys(data).length === 0 ? null : (
    <Container>
      <Header>내 정보</Header>
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
          <div className="title">업체 명</div>
          <div>{data.company}</div>
        </div>
        <div>
          <div className="title">업체 주소</div>
          <div>
            {data.address === "&&"
              ? null
              : data.address.split("&")[1] + " " + data.address.split("&")[2]}
          </div>
        </div>
        <div>
          <div className="title">대표 번호</div>
          <div>{data.phone}</div>
        </div>
        <div>
          <div className="title">사업자 등록번호</div>
          <div>{data.reg}</div>
        </div>
        <div>
          <div className="title">카테고리</div>
          <div>{data.category}</div>
        </div>
      </Info>
      <Button>
        <Link
          to={{
            pathname: "/info/modify",
            state: { data },
          }}
        >
          수정
        </Link>
      </Button>
    </Container>
  );
};

export default SellerInfo;
