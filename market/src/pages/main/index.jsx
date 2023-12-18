import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { debounce } from "lodash";
import axiosInstance from "../../axios";
import { start, end } from "../../features/loading";
import { Container, Title, Item } from "./styles";
import alt from "../../image/alt.png";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState({
    popularProduct: [],
    newProduct: [],
  });
  const [show, setShow] = useState(3);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    getProduct();
    setFetch(true);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    if (window.innerWidth > 1024) setShow(3);
    if (window.innerWidth >= 768 && window.innerWidth < 1024) setShow(2);
    if (window.innerWidth < 768) setShow(1);
  }, 500);

  const getProduct = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get("/api/product");
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, []);

  const popularList = products.popularProduct.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0];
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
        : JSON.parse(product.img)[0];
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
    slidesToShow:
      products.popularProduct.length < 3
        ? products.popularProduct.length
        : show,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      products.newProduct.length < 3 ? products.newProduct.length : show,
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
