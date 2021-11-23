import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Button from "@mui/material/Button";
import profile from "../../../../images/profile/profile.png";

import axios from "axios";

import { Container, Header, Info, Buttons } from "./styles";

const UserInfoUpdate = (props) => {
  const auth = useSelector((state) => state.auth);

  const phoneRegExp = /^[0-9]{1,11}$/;

  const [imgCheck, setImgCheck] = useState(false);
  const [img, setImg] = useState(props.userData.img);
  const [phone, setPhone] = useState(props.userData.phone);

  const requestUpdateUserData = useCallback(async () => {
    if (!phoneRegExp.test(phone))
      return window.alert("연락처를 정확히 입력해주세요");

    const result = window.confirm("정보를 수정하시겠습니까?");

    const formData = new FormData();
    formData.append("imgCheck", imgCheck);
    formData.append("img", img);
    formData.append("originalImg", props.userData.img);
    formData.append("phone", phone);

    if (result) {
      try {
        await axios.put("/api/auth/user", formData, {
          headers: {
            token: auth.token,
            signuptype: 1,
            signupid: props.userData.id,
          },
        });
        props.requestUserData();
        window.alert("정보가 수정되었습니다.");
        props.history.replace("/info");
      } catch (error) {
        console.log(error);
      }
    }
  }, [img, imgCheck, phone]);

  return (
    <Container>
      <Header>정보 수정</Header>
      <Info>
        <div className="header left">
          <div>대표사진</div>
        </div>
        <div className="left">
          <div>
            <img
              src={
                img === null
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
        </div>
        <div className="header right">
          <div>아이디</div>
          <div>이름</div>
          <div>연락처</div>
          <div>성별</div>
          <div>생년월일</div>
        </div>
        <div className="right">
          <div>{props.userData.id}</div>
          <div>{props.userData.name}</div>
          <div>
            <TextField
              variant="outlined"
              value={phone}
              error={!phoneRegExp.test(phone) ? true : false}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ maxLength: 11 }}
            />
          </div>
          <div>{props.userData.gender}</div>
          <div>{props.userData.birth}</div>
        </div>
      </Info>
      <Buttons>
        <Button variant="contained" onClick={requestUpdateUserData}>
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

export default UserInfoUpdate;
