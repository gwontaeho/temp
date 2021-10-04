import React from "react";
import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import Modal from "react-modal";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { Container, Buttons } from "./styles";

Modal.setAppElement("#root");

const Seller = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const passwordRegExp = /^[a-zA-z0-9]{8,24}$/;
  const nameRegExp = /^[가-힣]{2,8}$/;
  const companyRegExp = /^[a-zA-z0-9가-힣]{1,12}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;
  const regRegExp = /^[0-9]{10}$/;

  const idRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordCheckRef = React.createRef();
  const companyRef = React.createRef();
  const nameRef = React.createRef();
  const phoneRef = React.createRef();
  const regRef = React.createRef();

  const [isOpend, setIsOpend] = useState(false);
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
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

  const openModal = useCallback(() => {
    setIsOpend(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpend(false);
  }, []);

  const validation = useCallback((v) => {
    v.current.style.display = "block";
  }, []);

  const onClickCheckId = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");

    try {
      const response = await axios.post("/api/auth/signup/check", {
        id,
      });
      console.log(response.data === "ok");
      if (response.data === "ok") setIdCheck(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const onChangeId = useCallback(
    (e) => {
      validation(idRef);
      setIdCheck(false);
      setId(e.target.value);
    },
    [idRef]
  );

  const onChangePassword = useCallback(
    (e) => {
      validation(passwordRef);

      setPassword(e.target.value);
    },
    [passwordRef]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      validation(passwordCheckRef);

      setPasswordCheck(e.target.value);
    },
    [passwordCheckRef]
  );

  const onChangeCompany = useCallback(
    (e) => {
      validation(companyRef);

      setCompany(e.target.value);
    },
    [companyRef]
  );

  const onChangeName = useCallback(
    (e) => {
      validation(nameRef);

      setName(e.target.value);
    },
    [nameRef]
  );

  const onChangePhone = useCallback(
    (e) => {
      validation(phoneRef);

      setPhone(e.target.value);
    },
    [phoneRef]
  );

  const onChangeExtraAd = useCallback((e) => {
    setExtraAd(e.target.value);
  }, []);

  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const onChangeReg = useCallback(
    (e) => {
      validation(regRef);

      setReg(e.target.value);
    },
    [regRef]
  );

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

  const onClickSignUp = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");
    if (!idCheck) return window.alert("아이디 중복확인을 해주세요");
    if (!passwordRegExp.test(password))
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (!passwordRegExp.test(passwordCheck))
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (password !== passwordCheck)
      return window.alert("비밀번호를 정확히 입력해주세요");
    if (!companyRegExp.test(company))
      return window.alert("업체명을 정확히 입력해주세요");
    if (!nameRegExp.test(name))
      return window.alert("대표자를 정확히 입력해주세요");
    if (address === "") return window.alert("주소를 입력해주세요");
    if (extraAd === "") return window.alert("상세주소를 입력해주세요");
    if (!phoneRegExp.test(phone))
      return window.alert("대표번호를 정확히 입력해주세요");
    if (!regRegExp.test(reg))
      return window.alert("사업자등록번호를 정확히 입력해주세요");

    try {
      await axios.post("/api/auth/signup/seller", {
        id,
        password,
        company,
        name,
        phone,
        address: shortAddress + "&" + address + "&" + extraAd,
        category,
        reg,
      });
      return props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [
    id,
    idCheck,
    password,
    passwordCheck,
    company,
    name,
    phone,
    shortAddress,
    address,
    extraAd,
    category,
    reg,
  ]);

  const onClickCancel = useCallback(() => {
    return props.history.push("/");
  }, []);

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
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

      <label>
        <div className="title">
          <div>아이디</div>
          <div className="idCheck" onClick={onClickCheckId}>
            중복확인
          </div>
        </div>
        <div className="contents">
          <input
            value={id}
            type="text"
            maxLength="12"
            autoFocus
            onChange={onChangeId}
          />
          <div ref={idRef}>{idRegExp.test(id) && idCheck ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">비밀번호</div>
        <div className="contents">
          <input
            value={password}
            type="password"
            maxLength="24"
            onChange={onChangePassword}
          />
          <div ref={passwordRef}>
            {passwordRegExp.test(password) ? "o" : "x"}
          </div>
        </div>
      </label>

      <label>
        <div className="title">비밀번호 확인</div>
        <div className="contents">
          <input
            value={passwordCheck}
            type="password"
            maxLength="24"
            onChange={onChangePasswordCheck}
          />
          <div ref={passwordCheckRef}>
            {passwordRegExp.test(passwordCheck) && password === passwordCheck
              ? "o"
              : "x"}
          </div>
        </div>
      </label>

      <label>
        <div className="title">업체명</div>
        <div className="contents">
          <input
            value={company}
            type="text"
            maxLength="12"
            onChange={onChangeCompany}
          />
          <div ref={companyRef}>{companyRegExp.test(company) ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">대표자</div>
        <div className="contents">
          <input
            value={name}
            type="text"
            maxLength="12"
            onChange={onChangeName}
          />
          <div ref={nameRef}>{nameRegExp.test(name) ? "o" : "x"}</div>
        </div>
      </label>

      <label>
        <div className="title">대표번호</div>
        <div className="contents">
          <input
            value={phone}
            type="text"
            maxLength="11"
            onChange={onChangePhone}
          />
          <div ref={phoneRef}>{phoneRegExp.test(phone) ? "o" : "x"}</div>
        </div>
      </label>

      <label className="address">
        <div className="title">주소</div>
        <input type="text" value={address} readOnly onClick={openModal} />
        <input
          type="text"
          value={extraAd}
          onChange={onChangeExtraAd}
          placeholder="상세주소를 입력하세요"
        />
      </label>

      <label>
        <div className="title">카테고리</div>
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
        <div className="title">사업자등록번호</div>
        <div className="contents">
          <input
            value={reg}
            type="text"
            maxLength="10"
            onChange={onChangeReg}
          />
          <div ref={regRef}>{regRegExp.test(reg) ? "o" : "x"}</div>
        </div>
      </label>

      <Buttons>
        <div onClick={onClickSignUp}>가입하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Buttons>
    </Container>
  );
};

export default Seller;
