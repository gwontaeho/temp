import { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";

const CreateClass = () => {
  const [img, setImg] = useState("");

  const onChangeImg = useCallback((e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setImg(URL.createObjectURL(e.target.files[0]));
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("abc");
  }, []);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <label htmlFor="">
          클래스 대표사진
          {img ? <img src={img} /> : null}
          <input type="file" onChange={onChangeImg} />
        </label>
        {}
        <label htmlFor="">
          클래스명
          <input type="text" />
        </label>
        <label htmlFor="">
          수강료ㅇ
          <input type="text" />
        </label>

        <label htmlFor="">
          수강시간 약 <input type="text" /> 시간
          <input type="text" /> 분
        </label>
        <button type="submit"></button>
      </form>
    </Container>
  );
};

export default CreateClass;
