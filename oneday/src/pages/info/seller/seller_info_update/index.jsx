import React, { useState, useCallback } from "react";
import DaumPostcode from "react-daum-postcode";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Button from "@mui/material/Button";

import profile from "../../../../images/profile/profile.png";

import axios from "axios";

import {
  Container,
  Header,
  Info,
  ModalBox,
  Introduce,
  Buttons,
} from "./styles";

const SellerInfoUpdate = (props) => {
  const auth = useSelector((state) => state.auth);

  const companyRegExp = /^[a-zA-z0-9가-힣]{1,12}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;

  const [open, setOpen] = useState(false);

  const [imgCheck, setImgCheck] = useState(false);
  const [img, setImg] = useState(props.sellerData.img);
  const [company, setCompany] = useState(props.sellerData.company);
  const [phone, setPhone] = useState(props.sellerData.phone);
  const [shortAddress, setShortAddress] = useState(
    props.sellerData.address.split("&")[0]
  );
  const [address, setAddress] = useState(
    props.sellerData.address.split("&")[1]
  );
  const [extraAd, setExtraAd] = useState(
    props.sellerData.address.split("&")[2]
  );
  const [category, setCategory] = useState(props.sellerData.category);
  const [introduce, setIntroduce] = useState(
    props.sellerData.introduce === null ? "" : props.sellerData.introduce
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
    setOpen(false);
  }, []);

  const requestUpdateSellerData = useCallback(async () => {
    if (!companyRegExp.test(company))
      return window.alert("업체명을 정확히 입력해주세요");
    if (address === "") return window.alert("주소를 입력해주세요");
    if (extraAd === "") return window.alert("상세주소를 입력해주세요");
    if (!phoneRegExp.test(phone))
      return window.alert("대표번호를 정확히 입력해주세요");

    const result = window.confirm("정보를 수정하시겠습니까?");

    const formData = new FormData();
    formData.append("imgCheck", imgCheck);
    formData.append("img", img);
    formData.append("originalImg", props.sellerData.img);
    formData.append("company", company);
    formData.append("phone", phone);
    formData.append("address", shortAddress + "&" + address + "&" + extraAd);
    formData.append("category", category);
    formData.append("introduce", introduce);

    if (result) {
      try {
        await axios.put("/api/auth/seller", formData, {
          headers: {
            token: auth.token,
            signuptype: 2,
            signupid: props.sellerData.id,
          },
        });
        props.requestSellerData();
        window.alert("정보가 수정되었습니다.");
        props.history.replace("/info");
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    img,
    imgCheck,
    company,
    phone,
    shortAddress,
    address,
    extraAd,
    category,
    introduce,
  ]);

  return (
    <Container>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={ModalBox}>
          <DaumPostcode onComplete={handleComplete} />
        </Box>
      </Modal>
      <Header>정보 수정</Header>
      <Info>
        <div className="header left">
          <div>대표사진</div>
          <div>아이디</div>
          <div>이름</div>
          <div>업체명</div>
        </div>
        <div className="left">
          <div>
            <img
              src={
                img === null || img === "null"
                  ? profile
                  : !imgCheck
                  ? img.replace(/\\/gi, "/").replace(/public/gi, "")
                  : URL.createObjectURL(img)
              }
            />
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  setImgCheck(true);
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {imgCheck ? (
              <div className="button_img_back">
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => {
                    setImgCheck(false);
                    setImg(props.sellerData.img);
                  }}
                >
                  <SettingsBackupRestoreIcon />
                </IconButton>
              </div>
            ) : null}
          </div>
          <div>{props.sellerData.id}</div>
          <div>{props.sellerData.name}</div>
          <div>
            <TextField
              variant="outlined"
              value={company}
              error={!companyRegExp.test(company) ? true : false}
              onChange={(e) => setCompany(e.target.value)}
              inputProps={{ maxLength: 12 }}
            />
          </div>
        </div>
        <div className="header right">
          <div>대표번호</div>
          <div>사업자등록번호</div>
          <div>주소</div>
          <div>상세 주소</div>
          <div>카테고리</div>
        </div>
        <div className="right">
          <div>
            <TextField
              variant="outlined"
              value={phone}
              error={!phoneRegExp.test(phone) ? true : false}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ maxLength: 11 }}
            />
          </div>
          <div>{props.sellerData.reg}</div>
          <div>
            <TextField
              variant="outlined"
              value={address}
              InputProps={{
                readOnly: true,
              }}
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={extraAd === "" ? true : false}
              value={extraAd}
              onChange={(e) => setExtraAd(e.target.value)}
            />
          </div>
          <div>
            <FormControl>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="플라워">플라워</MenuItem>
                <MenuItem value="요리">요리</MenuItem>
                <MenuItem value="미술">미술</MenuItem>
                <MenuItem value="수공예">수공예</MenuItem>
                <MenuItem value="액티비티">액티비티</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Info>
      <Introduce>
        <div className="title">소개</div>
        <div className="input">
          <TextField
            fullWidth
            variant="outlined"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            multiline
            maxRows={5}
          />
        </div>
      </Introduce>
      <Buttons>
        <Button variant="contained" onClick={requestUpdateSellerData}>
          수정
        </Button>
        <Button
          variant="outlined"
          onClick={() => props.history.replace("/info")}
        >
          취소
        </Button>
      </Buttons>
    </Container>
  );
};

export default SellerInfoUpdate;
