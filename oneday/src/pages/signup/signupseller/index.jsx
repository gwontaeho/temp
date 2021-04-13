import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import Modal from "react-modal";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { Container } from "./styles";

Modal.setAppElement("#root");

const SignupSeller = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const userReg = /^[a-zA-Z0-9]{6,12}$/;
  const passwordReg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{6,24}$/;
  const nameReg = /^[가-힣]*$/;

  const [isOpend, setIsOpend] = useState(false);
  const [seller, setSeller] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [reg, setReg] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/signup/seller", {
          seller,
          password,
          name,
          phone,
          address: address + " " + extraAd,
          reg,
        });
        console.log(response.data);
        return history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [seller, password, passwordCheck, name, phone, address, extraAd, reg]
  );

  const onChangeSeller = useCallback((e) => {
    setSeller(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    console.log(passwordReg.test(e.target.value));
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    console.log(nameReg.test(e.target.value));
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

  if (cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <label>
          아이디
          <input
            value={seller}
            type="text"
            maxLength="12"
            autoFocus
            onChange={onChangeSeller}
          />
        </label>
        <label>
          비밀번호
          <input
            value={password}
            type="password"
            maxLength="24"
            onChange={onChangePassword}
          />
        </label>
        <label>
          비밀번호 확인
          <input
            value={passwordCheck}
            type="password"
            maxLength="24"
            onChange={onChangePasswordCheck}
          />
        </label>
        <label>
          대표자
          <input
            value={name}
            type="text"
            maxLength="12"
            onChange={onChangeName}
          />
        </label>
        <label>
          대표번호
          <input
            value={phone}
            type="text"
            maxLength="11"
            onChange={onChangePhone}
          />
        </label>
        <label>
          주소
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
          사업자등록번호
          <input
            value={reg}
            type="text"
            maxLength="10"
            onChange={onChangeReg}
          />
        </label>
        <button type="submit">가입하기</button>
      </form>
    </Container>
  );
};

export default SignupSeller;
