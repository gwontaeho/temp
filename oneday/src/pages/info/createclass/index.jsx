import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Container } from "./styles";
import axios from "axios";

const CreateClass = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

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

  const onSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("time", time);
    try {
      const response = await axios.post("/api/createclass", formData, {
        headers: {
          token: cookies.token,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [img, name, price, time]);

  return (
    <Container>
      <label>
        클래스 대표사진
        {img ? (
          <img src={URL.createObjectURL(img)} style={{ width: "400px" }} />
        ) : null}
        <input type="file" onChange={onChangeImg} />
      </label>
      <label>
        클래스명
        <input type="text" value={name} onChange={onChangeName} />
      </label>
      <label>
        수강료ㅇ
        <input type="text" value={price} onChange={onChangePrice} />
      </label>
      <label>
        수강시간 약
        <input type="text" value={time} onChange={onChangeTime} /> 분
      </label>

      <button type="button" onClick={onSubmit}>
        클래스 등록
      </button>
    </Container>
  );
};

export default CreateClass;
