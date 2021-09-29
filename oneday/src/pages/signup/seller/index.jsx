import React from "react";
import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import Modal from "react-modal";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { Container, Buttons } from "./styles";

Modal.setAppElement("#root");

const Seller = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const regId = /^[A-Za-z]{1}[A-Za-z0-9]{8,12}$/;

  const [isOpend, setIsOpend] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [category, setCategory] = useState("etc");
  const [reg, setReg] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeCompany = useCallback((e) => {
    setCompany(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onChangeReg = useCallback((e) => {
    setReg(e.target.value);
  }, []);

  const onChangeExtraAd = useCallback((e) => {
    setExtraAd(e.target.value);
  }, []);

  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const handleComplete = useCallback((data) => {
    let short = data.sigungu + " " + data.bname;
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setShortAddress(short);
    setAddress(fullAddress);
    closeModal();
  }, []);

  const onClickSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/signup/seller", {
          id,
          password,
          company,
          name,
          phone,
          address: shortAddress + "&" + address + "&" + extraAd,
          category,
          reg,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [id, password, company, name, phone, address, extraAd, category, reg]
  );

  const onClickCancel = useCallback(() => {
    return history.push("/");
  }, []);

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <label>
        <div>아이디</div>
        <input
          value={id}
          type="text"
          maxLength="12"
          autoFocus
          onChange={onChangeId}
          placeholder="영문과 숫자를 포함한 8~12자리"
          style={{ borderColor: regId.test(id) ? "green" : "lightgray" }}
        />
      </label>
      <label>
        <div>비밀번호</div>
        <input
          value={password}
          type="password"
          maxLength="24"
          onChange={onChangePassword}
          placeholder="24자 이내"
        />
      </label>
      <label>
        <div>비밀번호 확인</div>
        <input
          value={passwordCheck}
          type="password"
          maxLength="24"
          onChange={onChangePasswordCheck}
        />
      </label>
      <label>
        <div>업체명</div>
        <input
          value={company}
          type="text"
          maxLength="12"
          onChange={onChangeCompany}
        />
      </label>
      <label>
        <div>대표자</div>
        <input
          value={name}
          type="text"
          maxLength="12"
          onChange={onChangeName}
        />
      </label>
      <label>
        <div>대표번호</div>
        <input
          value={phone}
          type="text"
          maxLength="11"
          onChange={onChangePhone}
        />
      </label>
      <label>
        <div>주소</div>
        <input type="text" value={address} readOnly onClick={openModal} />
        <input
          type="text"
          value={extraAd}
          onChange={onChangeExtraAd}
          placeholder="상세 주소를 입력하세요."
        />
        <Modal
          isOpen={isOpend}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "600px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      </label>
      <label>
        <div>카테고리</div>
        <select onChange={onChangeCategory} defaultValue="etc">
          <option value="flower">플라워</option>
          <option value="cooking">요리</option>
          <option value="art">미술</option>
          <option value="handmade">수공예</option>
          <option value="activity">액티비티</option>
          <option value="etc">기타</option>
        </select>
      </label>
      <label>
        <div>사업자등록번호</div>
        <input value={reg} type="text" maxLength="10" onChange={onChangeReg} />
      </label>
      <Buttons>
        <div onClick={onClickSignUp}>가입하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Buttons>
    </Container>
  );
};

export default Seller;
