import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";

import { Container, Header, Ad, Product, StyledSlider, Footer } from "./styles";

const Main = () => {
  const [popProduct, setPopProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

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
      const response = await axios.get("/api/product/main");
      setPopProduct(response.data.popProduct);
      setNewProduct(response.data.newProduct);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const popProductList = popProduct.map((v) => {
    const category =
      v.category === "flower"
        ? "플라워"
        : v.category === "art"
        ? "미술"
        : v.category === "cooking"
        ? "요리"
        : v.category === "handmade"
        ? "수공예"
        : v.category === "activity"
        ? "액티비티"
        : "기타";
    return (
      <Product key={v.id}>
        <Link to={`/product?id=${v.id}`}>
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
          <div className="address">
            <IoLocationOutline />
            {v.address.split("&")[0]}
          </div>
          <div>{"[" + category + "] " + v.name}</div>
          <div>{v.price}원</div>
        </Link>
      </Product>
    );
  });

  const newProductList = newProduct.map((v) => {
    const category =
      v.category === "flower"
        ? "플라워"
        : v.category === "art"
        ? "미술"
        : v.category === "cooking"
        ? "요리"
        : v.category === "handmade"
        ? "수공예"
        : v.category === "activity"
        ? "액티비티"
        : "기타";
    return (
      <Product key={v.id}>
        <Link to={`/product?id=${v.id}`}>
          <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
          <div className="address">
            <IoLocationOutline />
            {v.address.split("&")[0]}
          </div>
          <div>{"[" + category + "] " + v.name}</div>
          <div>{v.price}원</div>
        </Link>
      </Product>
    );
  });

  return (
    <Container>
      <Ad>광고</Ad>
      <Header>인기 클래스</Header>
      <StyledSlider {...settings}>{popProductList}</StyledSlider>
      <Header>신규 클래스</Header>
      <StyledSlider {...settings}>{newProductList}</StyledSlider>
      <Footer />
    </Container>
  );
};

export default Main;
