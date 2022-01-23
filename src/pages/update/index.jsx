import { useState, useCallback, useEffect } from "react";
import Slider from "react-slick";
import DaumPostcode from "react-daum-postcode";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import axios from "axios";
import { useSelector } from "react-redux";
import {
  AddPhotoAlternateOutlined,
  SettingsBackupRestoreOutlined,
} from "@mui/icons-material";

import alt from "../../image/alt.png";
import { Main, Header, Contents, Img, Icons, Inputs, Buttons } from "./styles";

const Update = () => {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();

  const priceRegExp = /^\d*$/;

  const [open, setOpen] = useState(false);
  const [updateImg, setUpdateImg] = useState(false);
  const [originalImgs, setOriginalImgs] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product/${params.id}`);
      if (response.status === 200) {
        setOriginalImgs(JSON.parse(response.data.img));
        setName(response.data.name);
        setPrice(response.data.price);
        setAddress(response.data.address);
        setIntro(response.data.intro);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const putProduct = useCallback(async () => {
    if (!name || !price || !address || !intro || !priceRegExp.test(price))
      return window.alert("내용을 정확히 입력해주세요");

    const formData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      formData.append("img", imgs[i]);
    }
    formData.append("name", name);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("intro", intro);
    formData.append("id", params.id);
    formData.append("updateImg", updateImg);

    try {
      const response = await axios.put("/api/product", formData, {
        headers: {
          token: auth.token,
        },
      });
      if (response.status === 200)
        navigate(`/product/${params.id}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }, [updateImg, imgs, name, price, address, intro]);

  const handleComplete = useCallback((data) => {
    setAddress(`${data.sido} ${data.sigungu} ${data.bname}`);
    setOpen(false);
  }, []);

  const onError = useCallback((e) => {
    e.target.src = alt;
  }, []);

  const originalImgList = originalImgs.map((img) => {
    const src = !img ? alt : img.replace(/\\/gi, "/").replace(/public/gi, "");
    return <img key={img} src={src} alt={img} onError={onError} />;
  });

  const imgList = Array.from(imgs).map((img) => {
    const src = URL.createObjectURL(img);
    URL.revokeObjectURL(img);
    return <img key={img} src={src} alt="img" />;
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        <Header>글 수정</Header>

        <Img>
          <Slider {...settings}>{updateImg ? imgList : originalImgList}</Slider>
        </Img>

        <Icons>
          <label htmlFor="update-img-input">
            <AddPhotoAlternateOutlined fontSize="large" color="primary" />
          </label>
          <input
            id="update-img-input"
            type="file"
            onChange={(e) => {
              setImgs(e.target.files);
              if (e.target.files.length === 0) {
                setUpdateImg(false);
              } else setUpdateImg(true);
            }}
            multiple
            accept="image/*"
            style={{ display: "none" }}
          />
          <label>
            <SettingsBackupRestoreOutlined
              fontSize="large"
              color="primary"
              onClick={() => {
                setImgs([]);
                setUpdateImg(false);
              }}
            />
          </label>
        </Icons>

        <Inputs>
          <div className="name">
            <TextField
              variant="standard"
              label="글 제목"
              fullWidth
              value={name}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={!price || !priceRegExp.test(price)}
              helperText={
                !price
                  ? "상품의 가격을 입력해주세요"
                  : !priceRegExp.test(price) && "숫자만 입력해주세요"
              }
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
              readOnly
              value={address}
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="intro">
            <textarea
              placeholder="내용을 입력해주세요"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
        </Inputs>

        <Buttons>
          <Button variant="contained" size="large" onClick={putProduct}>
            수정
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(`/product/${params.id}`, { replace: true })}
          >
            취소
          </Button>
        </Buttons>
      </Contents>
    </Main>
  );
};

export default Update;
