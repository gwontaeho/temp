import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import axios from "axios";

import { Container, Title, Img, Contents } from "./styles";
import alt from "../../image/alt.png";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const nicknameRegExp = /^[가-힣]{2,6}$/;
  const passwordRegExp = /^[a-zA-Z0-9]{6,18}$/;

  const [user, setUser] = useState({});
  const [img, setImg] = useState();
  const [src, setSrc] = useState();
  const [deleteImg, setDeleteImg] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/user/${auth.id}`);
      if (response.status === 200) {
        setUser(response.data);
        setImg();
        setSrc();
        setDeleteImg(false);
        setNickname(response.data.nickname);
        setPassword("");
        setNewPassword("");
        setNewPasswordCheck("");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkNickname = useCallback(async () => {
    if (!nicknameRegExp.test(nickname)) return;
    try {
      const response = await axios.get(
        `/api/user/nickname?nickname=${nickname}`
      );
      if (response.status === 200 && response.data) setNicknameCheck(true);

      if (response.status === 200 && !response.data)
        window.alert("이미 사용중인 별명입니다");
    } catch (error) {
      console.log(error);
    }
  }, [nickname]);

  const putNickname = useCallback(async () => {
    try {
      const response = await axios.put(
        "/api/user/nickname",
        { nickname },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      window.alert("별명이 변경되었습니다.");
      getUser();
    } catch (error) {
      getUser();
    }
  }, [nickname]);

  const putPassword = useCallback(async () => {
    try {
      const response = await axios.put(
        "/api/user/password",
        { password, newPassword },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      window.alert("비밀번호가 변경되었습니다.");
      getUser();
    } catch (error) {
      window.alert("잘못된 비밀번호입니다.");
      getUser();
    }
  }, [password, newPassword]);

  const putImg = useCallback(async () => {
    URL.revokeObjectURL(src);
    const formData = new FormData();
    formData.append("img", img);
    try {
      const response = await axios.put("/api/user/img", formData, {
        headers: { token: auth.token },
      });
      getUser();
    } catch (error) {
      getUser();
    }
  }, [img]);

  const onClickUpload = useCallback(() => {
    const input = document.getElementById("profile-img-input");
    input.click();
  }, []);

  return (
    <Container>
      <Title>프로필 수정</Title>
      <Img
        src={
          user.img && !deleteImg && !src
            ? user.img.replace(/\\/gi, "/").replace(/public/gi, "")
            : src || alt
        }
        alt="profile"
      />
      <Contents>
        <div className="img">
          <ButtonGroup>
            <Button
              variant={img ? "contained" : "outlined"}
              onClick={onClickUpload}
            >
              업로드
              <input
                id="profile-img-input"
                type="file"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setImg(e.target.files[0]);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setDeleteImg(false);
                  }
                }}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Button>
            <Button
              variant={!img && !deleteImg ? "contained" : "outlined"}
              onClick={() => {
                const input = document.getElementById("profile-img-input");
                input.value = "";
                URL.revokeObjectURL(src);
                setImg();
                setSrc();
                setDeleteImg(false);
              }}
            >
              원래대로
            </Button>
            <Button
              disabled={!user.img}
              variant={deleteImg ? "contained" : "outlined"}
              onClick={() => {
                const input = document.getElementById("profile-img-input");
                input.value = "";
                URL.revokeObjectURL(src);
                setImg();
                setSrc();
                setDeleteImg(true);
              }}
            >
              삭제
            </Button>
          </ButtonGroup>
          <Button onClick={putImg} disabled={!img && !deleteImg}>
            변경
          </Button>
        </div>
        <Divider />
        <div className="nickname">
          <div className="textfield">
            <TextField
              label="별명"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameCheck(false);
              }}
              error={
                user.nickname === nickname
                  ? false
                  : !nicknameCheck || !nicknameRegExp.test(nickname)
              }
              helperText={
                user.nickname === nickname
                  ? false
                  : !nicknameRegExp.test(nickname)
                  ? "2~6자의 한글만 사용 가능합니다"
                  : !nicknameCheck && "중복확인을 해주세요"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      disabled={user.nickname === nickname || nicknameCheck}
                      onClick={checkNickname}
                    >
                      중복확인
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            disabled={
              user.nickname === nickname ||
              !nicknameRegExp.test(nickname) ||
              !nicknameCheck
            }
            onClick={putNickname}
          >
            변경
          </Button>
        </div>
        <Divider />
        <div className="textfield">
          <TextField
            label="현재 비밀번호"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="textfield">
          <TextField
            label="신규 비밀번호"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!passwordRegExp.test(newPassword)}
            helperText={
              !passwordRegExp.test(newPassword) &&
              "6~18자의 대 소문자, 숫자만 사용 가능합니다"
            }
          />
        </div>
        <div className="password">
          <div className="textfield">
            <TextField
              label="신규 비밀번호 확인"
              variant="outlined"
              fullWidth
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            />
          </div>
          <Button
            disabled={
              newPassword !== newPasswordCheck ||
              !passwordRegExp.test(newPassword)
            }
            onClick={putPassword}
          >
            변경
          </Button>
        </div>
      </Contents>
    </Container>
  );
};

export default Profile;
