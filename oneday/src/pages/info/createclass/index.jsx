import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

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

  const onclickRemove = useCallback((e) => {
    e.target.parentNode.parentNode.remove();
  }, []);

  const onClickAdd = useCallback(() => {
    const detail = document.getElementsByClassName("detail");
    if (detail.length == 5) return;
    const detailContainer = document.getElementsByClassName(
      "detailContainer"
    )[0];
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
    detailContainer.appendChild(newDiv);
  }, []);

  const onClickValue = () => {
    let stringary = [];
    const details = document.getElementsByClassName("detail");
    [...details].forEach((v) => {
      let stringobj = {};
      stringobj["title"] = v.childNodes[0].childNodes[0].value;
      stringobj["text"] = v.childNodes[1].value;
      stringary.push(stringobj);
    });
    console.log(JSON.stringify(stringary));
  };

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
    formData.append("img", img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("time", time);
    formData.append("text", JSON.stringify(stringary));

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
      <div className="btns">
        <a onClick={onSubmit}>클래스 등록</a>
        <Link to="/info/manageclass">취소</Link>
      </div>
      <div className="info">
        <div className="section">
          <div className="title">클래스 대표사진</div>
          <img src={img ? URL.createObjectURL(img) : null} />
          <label htmlFor="input-file">사진선택</label>
          <input
            id="input-file"
            type="file"
            onChange={onChangeImg}
            style={{ display: "none" }}
          />
        </div>

        <div className="section">
          <div className="title">클래스 이름</div>
          <input type="text" value={name} onChange={onChangeName} />
        </div>

        <div className="section">
          <div className="title">수강료</div>
          <input type="text" value={price} onChange={onChangePrice} />
        </div>

        <div className="section">
          <div className="title">수강시간</div>
          <input type="text" value={time} onChange={onChangeTime} /> 분
        </div>

        <div className="section">
          <div className="title">상세정보</div>
          <div className="details">
            <div className="add" onClick={onClickAdd}>
              영역 추가
            </div>
            <div className="add" onClick={onClickValue}>
              확인
            </div>
            <div className="detailContainer"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateClass;
