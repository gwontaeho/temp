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

Modal.setAppElement("#root");

const SellerClassModify = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [productData, setProductData] = useState([]);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [address, setAddress] = useState("");
  const [extraAd, setExtraAd] = useState("");
  const [detail, setDetail] = useState([]);

  const [imgCheck, setImgCheck] = useState(0);
  const [addressType, setAddressType] = useState("0");
  const [seller, setSeller] = useState({});
  const [newShortAddress, setNewShortAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newExtraAd, setNewExtraAd] = useState("");
  const [isOpend, setIsOpend] = useState(false);

  useEffect(() => {
    requestSellerData();
    requestProductData();
  }, []);

  const requestSellerData = useCallback(async () => {
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

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/product/seller/detail",
        {
          id: props.match.params.id,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      console.log(response.data);
      setProductData(response.data);
      setImg(response.data.img.replace(/\\/gi, "/").replace(/public/gi, ""));
      setName(response.data.name);
      setPrice(response.data.price);
      setTime(response.data.time);
      setDetail(JSON.parse(response.data.detail));

      if (response.data.address !== "&&") {
        setShortAddress(response.data.address.split("&")[0]);
        setAddress(response.data.address.split("&")[1]);
        setExtraAd(response.data.address.split("&")[2]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeImg = useCallback((e) => {
    setImgCheck(1);
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
  const onChangeNewExtraAd = useCallback((e) => {
    setNewExtraAd(e.target.value);
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
    let stringary = [];
    const details = document.getElementsByClassName("detail");
    [...details].forEach((v) => {
      let stringobj = {};
      stringobj["title"] = v.childNodes[0].childNodes[0].value;
      stringobj["text"] = v.childNodes[1].value;
      stringary.push(stringobj);
    });

    const formData = new FormData();
    formData.append("productId", productData.id);
    formData.append("imgCheck", imgCheck);
    formData.append("img", img);
    formData.append("oldImg", productData.img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("time", time);
    if (addressType === 0) {
      formData.append("address", shortAddress + "&" + address + "&" + extraAd);
    } else if (addressType === 1) {
      formData.append("address", seller.address);
    } else if (addressType === 2) {
      formData.append(
        "address",
        newShortAddress + "&" + newAddress + "&" + newExtraAd
      );
    }
    formData.append("detail", JSON.stringify(stringary));

    try {
      const response = await axios.post("/api/product/update", formData, {
        headers: {
          token: cookies.token,
        },
      });
      console.log(response);
      props.history.replace(`/info/class/${productData.id}`);
    } catch (error) {
      console.log(error);
    }
  }, [
    productData,
    img,
    name,
    price,
    time,
    shortAddress,
    address,
    extraAd,
    newShortAddress,
    newAddress,
    newExtraAd,
    seller,
    addressType,
    imgCheck,
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

    setNewShortAddress(short);
    setNewAddress(fullAddress);
    closeModal();
  }, []);

  const onClickAddressButton = useCallback((e, v) => {
    const inputs = document.getElementsByClassName("inputs")[0];
    const addressButton1 = document.getElementsByClassName("addressButton")[0];
    const addressButton2 = document.getElementsByClassName("addressButton")[1];
    const addressButton3 = document.getElementsByClassName("addressButton")[2];
    addressButton1.classList.remove("selected");
    addressButton2.classList.remove("selected");
    addressButton3.classList.remove("selected");
    e.target.classList.add("selected");
    if (v === 0) {
      inputs.classList.remove("open");
      setAddressType(0);
    } else if (v === 1) {
      inputs.classList.remove("open");
      setAddressType(1);
    } else if (v === 2) {
      inputs.classList.add("open");
      setAddressType(2);
    }
  }, []);

  const detailList = detail.map((v) => {
    return (
      <div className="detail">
        <div className="header">
          <input className="detailTitle" defaultValue={v.title} />
          <div className="removeButton" onClick={onclickRemove}>
            삭제
          </div>
        </div>
        <textarea className="detailText" defaultValue={v.text} />
      </div>
    );
  });

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
      <Header>클래스 수정</Header>
      <Buttons>
        <a onClick={onSubmit}>수정</a>
        <Link to={`/info/class/${productData.index}`}>취소</Link>
      </Buttons>
      <Infos>
        <Img>
          <div className="title">클래스 대표사진</div>
          <label htmlFor="input-file">
            <img src={imgCheck === 0 ? img : URL.createObjectURL(img)} />
          </label>
          <input id="input-file" type="file" onChange={onChangeImg} />
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
            <div className="oldAddress">{address + " " + extraAd}</div>
            <div className="addressButtons">
              <div
                onClick={(e) => onClickAddressButton(e, 0)}
                className="addressButton selected"
              >
                변경 안함
              </div>
              <div
                onClick={(e) => onClickAddressButton(e, 1)}
                className="addressButton"
              >
                계정에 등록된 주소 사용
              </div>
              <div
                onClick={(e) => onClickAddressButton(e, 2)}
                className="addressButton"
              >
                직접 입력
              </div>
            </div>
            <div className="inputs">
              <input
                type="text"
                value={newAddress}
                readOnly
                onClick={openModal}
              />
              <input
                type="text"
                value={newExtraAd}
                onChange={onChangeNewExtraAd}
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
          <div className="details">{detailList}</div>
        </Details>
      </Infos>
    </Container>
  );
};

export default SellerClassModify;
