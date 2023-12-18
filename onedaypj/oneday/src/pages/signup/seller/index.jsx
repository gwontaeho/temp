import React from "react";
import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Container, Img, ModalBox } from "./styles";
import profile from "../../../images/profile/profile.png";

const Seller = (props) => {
  const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
  const passwordRegExp = /^[a-zA-z0-9]{8,24}$/;
  const nameRegExp = /^[가-힣]{2,8}$/;
  const companyRegExp = /^[a-zA-z0-9가-힣]{1,12}$/;
  const phoneRegExp = /^[0-9]{1,11}$/;
  const regRegExp = /^[0-9]{10}$/;

  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
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
  const [category, setCategory] = useState("기타");
  const [reg, setReg] = useState("");

  const onClickCheckId = useCallback(async () => {
    if (!idRegExp.test(id)) return window.alert("아이디를 정확히 입력해주세요");

    try {
      const response = await axios.get(`/api/auth/overlap?id=${id}`);
      console.log(response);
      if (response.status === 200) setIdCheck(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

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

    const formData = new FormData();
    formData.append("img", img);
    formData.append("id", id);
    formData.append("password", password);
    formData.append("company", company);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", shortAddress + "&" + address + "&" + extraAd);
    formData.append("category", category);
    formData.append("reg", reg);

    try {
      const response = await axios.post("/api/auth/seller/create", formData, {
        headers: { signuptype: 2, signupid: id },
      });
      if (response.status === 200) return props.history.replace("/");
    } catch (error) {
      console.log(error);
      return props.history.replace("/");
    }
  }, [
    img,
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

      <Img>
        <label htmlFor="input-file">
          <img src={img ? URL.createObjectURL(img) : profile} />
          <input
            id="input-file"
            type="file"
            accept="image/gif,image/jpeg,image/png"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </label>
      </Img>

      <div className="overlap">
        <Button variant="contained" onClick={onClickCheckId}>
          중복확인
        </Button>
      </div>
      <TextField
        label="아이디"
        variant="outlined"
        error={!idRegExp.test(id) ? true : !idCheck ? true : false}
        onChange={(e) => {
          setIdCheck(false);
          setId(e.target.value);
        }}
      />
      <TextField
        label="비밀번호"
        variant="outlined"
        type="password"
        error={!passwordRegExp.test(password) ? true : false}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        error={
          !passwordRegExp.test(passwordCheck)
            ? true
            : password !== passwordCheck
            ? true
            : false
        }
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <TextField
        label="업체명"
        variant="outlined"
        error={!companyRegExp.test(company) ? true : false}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        label="대표자"
        variant="outlined"
        error={!nameRegExp.test(name) ? true : false}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="대표번호"
        variant="outlined"
        error={!phoneRegExp.test(phone) ? true : false}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="사업자등록번호"
        variant="outlined"
        error={!regRegExp.test(reg) ? true : false}
        onChange={(e) => setReg(e.target.value)}
      />
      <TextField
        label="주소"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        value={address}
        onClick={() => setOpen(true)}
      />
      <TextField
        label="상세주소"
        variant="outlined"
        error={extraAd === "" ? true : false}
        onChange={(e) => setExtraAd(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="category-label">카테고리</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="카테고리"
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

      <Button variant="contained" onClick={onClickSignUp}>
        회원가입
      </Button>
      <Button variant="outlined" onClick={() => props.history.replace("/")}>
        취소
      </Button>
    </Container>
  );
};

export default Seller;
