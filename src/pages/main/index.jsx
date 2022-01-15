import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import { Container, Title, Item } from "./styles";
import alt from "../../image/alt.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    popularProduct: [],
    newProduct: [],
  });
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    getProduct();
    setFetch(true);
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const popularList = products.popularProduct.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0]
            .replace(/\\/gi, "/")
            .replace(/public/gi, "");
    return (
      <Item key={product.id}>
        <img
          src={src}
          alt={product.name}
          onError={(e) => (e.target.src = alt)}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className="name">{product.name}</div>
        <div className="price">{Number(product.price).toLocaleString()}원</div>
        <div>{product.address}</div>
        <div className="info">
          관심{product.wishes} · 댓글{product.comments}
        </div>
      </Item>
    );
  });

  const newList = products.newProduct.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0]
            .replace(/\\/gi, "/")
            .replace(/public/gi, "");
    return (
      <Item key={product.id}>
        <img
          src={src}
          alt={product.name}
          onError={(e) => (e.target.src = alt)}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className="name">{product.name}</div>
        <div className="price">{Number(product.price).toLocaleString()}원</div>
        <div>{product.address}</div>
        <div className="info">
          관심{product.wishes} · 댓글{product.comments}
        </div>
      </Item>
    );
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: products.popularProduct.length < 3 ? 1 : 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: products.newProduct.length < 3 ? 1 : 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    fetch && (
      <Container>
        <Title>인기 매물</Title>
        <Slider {...settings}>{popularList}</Slider>
        <Title>최근 등록된 매물</Title>
        <Slider {...settings2}>{newList}</Slider>
      </Container>
    )
  );
};

export default Main;
