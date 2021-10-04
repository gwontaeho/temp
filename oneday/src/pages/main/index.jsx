import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";

import { Container, Header, Ad, Contents, StyledSlider } from "./styles";

const Main = () => {
  const [popClass, setPopClass] = useState([]);
  const [newClass, setNewClass] = useState([]);

  let settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {
    requestData();
  }, []);

  const requestData = useCallback(async () => {
    try {
      const response = await axios.post("/api/classes/main", {});
      console.log(response.data);
      setPopClass(response.data.popClass);
      setNewClass(response.data.newClass);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const popClassList = popClass.map((v) => {
    return (
      <div>
        <Link to={`/product/${v.id}`} key={v.id} className="class">
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
          <div className="address">
            <IoLocationOutline />
            {v.address.split("&")[0]}
          </div>
          <div>{"[" + v.seller.category + "] " + v.name}</div>
          <div>{v.price}원</div>
        </Link>
      </div>
    );
  });

  const newClassList = newClass.map((v) => {
    return (
      <div>
        <Link to={`/product/${v.id}`} key={v.id} className="class">
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
          <div className="address">
            <IoLocationOutline />
            {v.address.split("&")[0]}
          </div>
          <div>{"[" + v.seller.category + "] " + v.name}</div>
          <div>{v.price}원</div>
        </Link>
      </div>
    );
  });

  return (
    <Container>
      <Contents>
        <Header>인기 클래스</Header>
        <StyledSlider {...settings}>{popClassList}</StyledSlider>
      </Contents>
      <Contents>
        <Header>신규 클래스</Header>
        <StyledSlider {...settings}>{newClassList}</StyledSlider>
      </Contents>
      <Ad>123</Ad>
    </Container>
  );
};

export default Main;
