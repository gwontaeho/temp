import React, { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

import axios from "axios";

import { Container, Header, Detail } from "./styles";

const UserInfoModify = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [isOpend, setIsOpend] = useState(false);

  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setData(props.location.state.data);
    setPhone(props.location.state.data.phone);

    if (props.location.state.type === 2) {
      setCompany(props.location.state.data.company);
      setCategory(props.location.state.data.category);

      if (props.location.state.data.address !== "&&") {
        setShortAddress(props.location.state.data.address.split("&")[0]);
        setAddress(props.location.state.data.address.split("&")[1]);
        setExtraAd(props.location.state.data.address.split("&")[2]);
      }
    }
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onClickModify = useCallback(async () => {
    const result = window.confirm("정보를 수정하시겠습니까?");

    if (result) {
      try {
        const response = await axios.post(
          "/api/auth/user/modify",
          { phone },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        window.alert("정보가 수정되었습니다.");
        props.history.push("/info");
      } catch (error) {
        console.log(error);
      }
    }
  }, [phone]);

  const onClickCancel = useCallback(() => {
    props.history.push("/info");
  }, []);

  return (
    <Container>
      <Header>정보 수정</Header>
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
        </div>
        <div className="btns">
          <div onClick={onClickModify}>수정하기</div>
          <div onClick={onClickCancel}>취소</div>
        </div>
      </Detail>
      <Detail>
        <div className="btns">
          <div onClick={onClickModify}>수정하기</div>
          <div onClick={onClickCancel}>취소</div>
        </div>
      </Detail>
    </Container>
  );
};

export default UserInfoModify;
