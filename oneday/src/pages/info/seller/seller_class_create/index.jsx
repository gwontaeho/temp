import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";

import {
  Container,
  Header,
  Buttons,
  Infos,
  Img,
  Info,
  Address,
  Details,
} from "./styles";
import axios from "axios";

const SellerClassCreate = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [img, setImg] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [time, setTime] = useState();
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(true);
  const [seller, setSeller] = useState({});
  const [shortAddress, setShortAddress] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [isOpend, setIsOpend] = useState(false);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = useCallback(async () => {
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
      setSeller(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeImg = useCallback((e) => {
    setImg(e.target.files[0]);
  }, []);
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);
  const onChangeTime = useCallback((e) => {
    setTime(e.target.value);
  }, []);
  const onChangeExtraAd = useCallback((e) => {
    setExtraAd(e.target.value);
  }, []);

  const onclickRemove = useCallback((e) => {
    e.target.parentNode.parentNode.remove();
  }, []);

  const onClickAdd = useCallback(() => {
    const detail = document.getElementsByClassName("detail");
    if (detail.length === 5) return;
    const details = document.getElementsByClassName("details")[0];
    const newDiv = document.createElement("div");
    const header = document.createElement("div");
    const newInput = document.createElement("input");
    const removeButton = document.createElement("div");
    const newTextarea = document.createElement("textarea");
    newDiv.className = "detail";
    header.className = "header";
    newInput.className = "detailTitle";
    removeButton.className = "removeButton";
    removeButton.innerHTML = "삭제";
    removeButton.addEventListener("click", onclickRemove);
    newTextarea.className = "detailText";
    header.appendChild(newInput);
    header.appendChild(removeButton);
    newDiv.appendChild(header);
    newDiv.appendChild(newTextarea);
    details.appendChild(newDiv);
  }, []);

  const onSubmit = useCallback(async () => {
    console.log(price);
    if (img === undefined)
      return window.alert("클래스 대표사진을 등록해주세요");
    if (name.length === 0) return window.alert("클래스 이름을 입력해주세요");
    if (price === "" || price === undefined)
      return window.alert("수강료를 입력해주세요");
    if (time === "" || time === undefined)
      return window.alert("수강시간을 입력해주세요");

    let stringary = [];
    const details = document.getElementsByClassName("detail");
    [...details].forEach((v) => {
      let stringobj = {};
      stringobj["title"] = v.childNodes[0].childNodes[0].value;
      stringobj["text"] = v.childNodes[1].value;
      stringary.push(stringobj);
    });

    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("time", time);
    formData.append("category", seller.category);
    if (useRegisteredAddress) formData.append("address", seller.address);
    else
      formData.append("address", shortAddress + "&" + address + "&" + extraAd);
    formData.append("detail", JSON.stringify(stringary));

    try {
      await axios.post("/api/product/create", formData, {
        headers: {
          token: cookies.token,
        },
      });
      history.replace("/info/class");
    } catch (error) {
      console.log(error);
    }
  }, [
    img,
    name,
    price,
    time,
    useRegisteredAddress,
    shortAddress,
    address,
    extraAd,
    seller,
  ]);

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

  const onClickAddressButton = useCallback((e) => {
    const value = e.target.getAttribute("value");
    const inputs = document.getElementsByClassName("inputs")[0];
    const addressButton1 = document.getElementsByClassName("addressButton")[0];
    const addressButton2 = document.getElementsByClassName("addressButton")[1];
    addressButton1.classList.remove("selected");
    addressButton2.classList.remove("selected");
    e.target.classList.add("selected");
    if (value === "1") {
      inputs.classList.add("open");
      setUseRegisteredAddress(false);
    } else {
      inputs.classList.remove("open");
      setUseRegisteredAddress(true);
    }
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
      <Header>클래스 생성</Header>
      <Buttons>
        <a onClick={onSubmit}>등록</a>
        <Link to="/info/class">취소</Link>
      </Buttons>
      <Infos>
        <Img>
          <div className="title">클래스 대표사진</div>
          <label htmlFor="input-file">
            <img src={img ? URL.createObjectURL(img) : null} />
          </label>
          <input
            id="input-file"
            type="file"
            accept="image/gif,image/jpeg,image/png"
            onChange={onChangeImg}
          />
        </Img>

        <Info>
          <div className="title">클래스 이름</div>
          <input type="text" value={name} onChange={onChangeName} />
        </Info>

        <Info>
          <div className="title">수강료 (원)</div>
          <input type="number" value={price} onChange={onChangePrice} />
        </Info>

        <Info>
          <div className="title">수강시간 (분)</div>
          <input type="number" value={time} onChange={onChangeTime} />
        </Info>

        <Address>
          <div className="title">주소</div>
          <div className="box">
            <div className="addressButtons">
              <div
                value="0"
                onClick={onClickAddressButton}
                className="addressButton selected"
              >
                등록된 주소 사용
              </div>
              <div
                value="1"
                onClick={onClickAddressButton}
                className="addressButton"
              >
                직접 입력
              </div>
            </div>
            <div className="inputs">
              <input type="text" value={address} readOnly onClick={openModal} />
              <input
                type="text"
                value={extraAd}
                onChange={onChangeExtraAd}
                placeholder="상세 주소를 입력하세요."
              />
            </div>
          </div>
        </Address>

        <Details>
          <div className="title">
            <div>상세정보</div>
            <div className="add" onClick={onClickAdd}>
              영역 추가
            </div>
          </div>
          <div className="details"></div>
        </Details>
      </Infos>
    </Container>
  );
};

export default SellerClassCreate;
