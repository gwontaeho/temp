import React, { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

import axios from "axios";

import { Container, Header, Detail } from "./styles";

Modal.setAppElement("#root");

const SellerInfoModify = (props) => {
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
    const result = window.confirm("정보를 수정하시겠습니까?");

    if (result) {
      if (props.location.state.type === 1) {
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
      } else if (props.location.state.type === 2) {
        try {
          const response = await axios.post(
            "/api/auth/seller/modify",
            {
              phone,
              company,
              address: shortAddress + "&" + address + "&" + extraAd,
              category,
            },
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
    }
  }, [phone, company, address, extraAd, category, props, cookies.token]);

  const onClickCancel = useCallback(() => {
    props.history.push("/info");
  }, []);

  return (
    <Container>
      <Header>정보 수정</Header>
      {props.location.state.type === 1 ? (
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
      ) : (
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
                  defaultValue={props.location.state.data.category}
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
          </div>
          <div className="btns">
            <div onClick={onClickModify}>수정하기</div>
            <div onClick={onClickCancel}>취소</div>
          </div>
        </Detail>
      )}
    </Container>
  );
};

export default SellerInfoModify;
