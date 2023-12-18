import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import DaumPostcode from "react-daum-postcode";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import axiosInstance from "../../axios";
import { start, end } from "../../features/loading";

import {
  AddPhotoAlternateOutlined,
  SettingsBackupRestoreOutlined,
} from "@mui/icons-material";

import { Main, Contents, Header, Img, Icons, Inputs, Buttons } from "./styles";
import alt from "../../image/alt.png";

const Write = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const priceRegExp = /^\d*$/;

  const [open, setOpen] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [intro, setIntro] = useState("");

  const handleComplete = useCallback((data) => {
    setAddress(`${data.sido} ${data.sigungu} ${data.bname}`);
    setOpen(false);
  }, []);

  const postProduct = useCallback(async () => {
    if (
      imgs.length === 0 ||
      !name ||
      !price ||
      !address ||
      !intro ||
      !priceRegExp.test(price)
    )
      return window.alert("내용을 정확히 입력해주세요");

    const formData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      formData.append("img", imgs[i]);
    }
    formData.append("name", name);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("intro", intro);

    try {
      dispatch(start());
      const response = await axiosInstance.post("/api/product", formData, {
        headers: {
          token: auth.token,
        },
      });
      if (response.status === 200) {
        dispatch(end());
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }, [imgs, name, price, address, intro]);

  const imglist = Array.from(imgs).map((img) => {
    const src = URL.createObjectURL(img);
    URL.revokeObjectURL(img);
    return <img key={img} src={src} alt="img" />;
  });

  return (
    <Main>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DaumPostcode onComplete={handleComplete} />
        </div>
      </Modal>

      <Contents>
        <Header>글 쓰기</Header>
        <Img>
          <Slider {...settings}>
            {imgs.length === 0 ? <img src={alt} alt="img" /> : imglist}
          </Slider>
        </Img>

        <Icons>
          <div style={{ color: "#d32f2f", fontWeight: "bold" }}>
            {imgs.length === 0 && "사진을 등록해주세요!"}
          </div>
          <div>
            <label htmlFor="write-img-input">
              <AddPhotoAlternateOutlined fontSize="large" color="primary" />
            </label>
            <input
              id="write-img-input"
              type="file"
              onChange={(e) => setImgs(e.target.files)}
              multiple
              accept="image/*"
              style={{ display: "none" }}
            />
            <label>
              <SettingsBackupRestoreOutlined
                fontSize="large"
                color="primary"
                onClick={() => setImgs([])}
              />
            </label>
          </div>
        </Icons>

        <Inputs>
          <div className="name">
            <TextField
              variant="standard"
              label="글 제목"
              fullWidth
              error={!name}
              helperText={!name && "제목을 입력해주세요"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="price">
            <TextField
              variant="standard"
              label="가격"
              fullWidth
              error={!price || !priceRegExp.test(price)}
              helperText={
                !price
                  ? "상품의 가격을 입력해주세요"
                  : !priceRegExp.test(price) && "숫자만 입력해주세요"
              }
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">&#8361;</InputAdornment>
                ),
              }}
            />
          </div>
          <div className="address">
            <TextField
              variant="standard"
              label="주소"
              fullWidth
              error={!address}
              helperText={
                !address &&
                "상품의 주소를 입력해주세요 (주소는 동이름 까지만 노출됩니다)"
              }
              onClick={() => setOpen(true)}
              readOnly
              value={address}
            />
          </div>
          <div className="intro">
            <textarea
              placeholder="내용을 입력해주세요"
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
        </Inputs>

        <Buttons>
          <Button variant="contained" size="large" onClick={postProduct}>
            등록
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/", { replace: true })}
          >
            취소
          </Button>
        </Buttons>
      </Contents>
    </Main>
  );
};

export default Write;
