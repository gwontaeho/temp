import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useSelector } from "react-redux";

import axios from "axios";

import { Container, Header, Info, Button } from "./styles";

Modal.setAppElement("#root");

const SellerInfoUpdate = (props) => {
  const auth = useSelector((state) => state.auth);

  const companyRegExp = /^[a-zA-z0-9가-힣]{1,12}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;

  const [isOpend, setIsOpend] = useState(false);

  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setData(props.location.state.sellerData);
    setPhone(props.location.state.sellerData.phone);
    setCompany(props.location.state.sellerData.company);
    setCategory(props.location.state.sellerData.category);
    if (props.location.state.sellerData.address !== "&&") {
      setShortAddress(props.location.state.sellerData.address.split("&")[0]);
      setAddress(props.location.state.sellerData.address.split("&")[1]);
      setExtraAd(props.location.state.sellerData.address.split("&")[2]);
    }
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

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onChangeCompany = useCallback((e) => {
    setCompany(e.target.value);
  }, []);

  const onChangeExtraAd = useCallback((e) => {
    setExtraAd(e.target.value);
  }, []);

  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const onClickModify = useCallback(async () => {
    if (!companyRegExp.test(company))
      return window.alert("업체명을 정확히 입력해주세요");
    if (address === "") return window.alert("주소를 입력해주세요");
    if (extraAd === "") return window.alert("상세주소를 입력해주세요");
    if (!phoneRegExp.test(phone))
      return window.alert("대표번호를 정확히 입력해주세요");

    const result = window.confirm("정보를 수정하시겠습니까?");

    if (result) {
      try {
        await axios.put(
          "/api/auth/seller",
          {
            phone,
            company,
            address: shortAddress + "&" + address + "&" + extraAd,
            category,
          },
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
  }, [phone, company, shortAddress, address, extraAd, category]);

  const onClickCancel = useCallback(() => {
    props.history.replace("/info");
  }, []);

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
          <div className="title">업체 명</div>
          <div>
            <input
              type="text"
              value={company}
              onChange={onChangeCompany}
              maxLength="11"
            />
          </div>
        </div>
        <div>
          <div className="title">업체 주소</div>
          <div>
            <input
              type="text"
              value={address}
              readOnly
              onClick={openModal}
              className="address"
            />
            <input
              type="text"
              value={extraAd}
              onChange={onChangeExtraAd}
              placeholder="상세 주소를 입력하세요."
              className="address"
            />
          </div>
        </div>
        <div>
          <div className="title">대표 번호</div>
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
          <div className="title">사업자 등록번호</div>
          <div>{data.reg}</div>
        </div>
        <div>
          <div className="title">카테고리</div>
          <div>
            <select
              onChange={onChangeCategory}
              defaultValue={props.location.state.sellerData.category}
            >
              <option value="flower">플라워</option>
              <option value="cooking">요리</option>
              <option value="art">미술</option>
              <option value="handmade">수공예</option>
              <option value="activity">액티비티</option>
              <option value="etc">기타</option>
            </select>
          </div>
        </div>
      </Info>

      <Button>
        <div onClick={onClickModify}>수정하기</div>
        <div onClick={onClickCancel}>취소</div>
      </Button>
    </Container>
  );
};

export default SellerInfoUpdate;
