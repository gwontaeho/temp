import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Skeleton from "@mui/material/Skeleton";
import ad from "../../images/ad/ad.png";

import { Container, Header, Ad, Product, StyledSlider } from "./styles";

const Main = () => {
  const [popProduct, setPopProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await axios.get(`/api/product/main`);
      console.log(response.data);
      setPopProduct(response.data.popProduct);
      setNewProduct(response.data.newProduct);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const popProductList = popProduct.map((v) => {
    const defaultValue =
      Array.isArray(v.reviews) && v.reviews.length !== 0
        ? Number(v.reviews[0].rating)
        : 0;
    return (
      <Product key={v.id}>
        <Link to={`/product?id=${v.id}`}>
          <div className="img">
            <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
            <div className="rating">
              <Rating
                name="half-rating-read"
                defaultValue={defaultValue}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
          <div className="info">
            <div className="address">
              <IoLocationOutline />
              {v.address.split("&")[0]}
            </div>
            <div>{"[" + v.category + "] " + v.name}</div>
            <div>{v.price}원</div>
          </div>
        </Link>
      </Product>
    );
  });

  const newProductList = newProduct.map((v) => {
    const defaultValue =
      Array.isArray(v.reviews) && v.reviews.length !== 0
        ? Number(v.reviews[0].rating)
        : 0;
    return (
      <Product key={v.id}>
        <Link to={`/product?id=${v.id}`}>
          <div className="img">
            <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
            <div className="rating">
              <Rating
                name="half-rating-read"
                defaultValue={defaultValue}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
          <div className="info">
            <div className="address">
              <IoLocationOutline />
              {v.address.split("&")[0]}
            </div>
            <div>{"[" + v.category + "] " + v.name}</div>
            <div>{v.price}원</div>
          </div>
        </Link>
      </Product>
    );
  });

  const loadingList = Array.from(new Array(5)).map(() => {
    return (
      <Product>
        <a>
          <div className="img">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={240}
              sx={{ borderRadius: "12px", width: "100%" }}
            />
          </div>
          <div className="info">
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ marginTop: "18px" }}
            />
          </div>
        </a>
      </Product>
    );
  });

  return (
    <Container>
      <Ad>
        <img src={ad} />
      </Ad>
      <Header>
        <div className="title">BEST CLASS</div>
        <div className="ex">지금 가장 인기있는 클래스</div>
      </Header>
      <StyledSlider {...settings}>
        {!loading ? popProductList : loadingList}
      </StyledSlider>
      <Header>
        <div className="title">NEW CLASS</div>
        <div className="ex">새로 등록된 클래스</div>
      </Header>
      <StyledSlider {...settings}>
        {!loading ? newProductList : loadingList}
      </StyledSlider>
    </Container>
  );
};

export default Main;
