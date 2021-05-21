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

  const [isOpend, setIsOpend] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [reg, setReg] = useState("");
  const [category, setCategory] = useState("etc");

  const onClickSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/signup/seller", {
          id,
          password,
          name,
          phone,
          address: address + " " + extraAd,
          category,
          reg,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [id, password, passwordCheck, name, phone, address, extraAd, category, reg]
  );

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
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

    setAddress(fullAddress);
    closeModal();
  }, []);

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
        />
      </label>
      <label>
        <div>비밀번호</div>
        <input
          value={password}
          type="password"
          maxLength="24"
          onChange={onChangePassword}
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
