import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";

import axios from "axios";

import { Main, Info, Profile, Controls, List, Item } from "./styles";
import alt from "../../image/alt.png";

const User = () => {
  const auth = useSelector((state) => state.auth);
  const params = useParams();

  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getProduct();
  }, [page]);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/user/${params.id}`);
      if (response.status === 200) setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product/seller?userId=${params.id}&page=${page}`
      );
      setProducts(response.data.rows);
      setCount(response.data.count);
      setPages(Math.ceil(response.data.count / 6));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  const onError = useCallback((e) => {
    e.target.src = alt;
  }, []);

  const productList = products.map((product) => {
    const src =
      JSON.parse(product.img).length === 0 || !product.img
        ? alt
        : JSON.parse(product.img)[0]
            .replace(/\\/gi, "/")
            .replace(/public/gi, "");

    return (
      <Item key={product.id}>
        <Link to={`/product/${product.id}`}>
          <img src={src} alt="sale" onError={onError} />
        </Link>
        <div className="name">{product.name}</div>
        <div className="price">{product.price}원</div>
        <div>{product.address}</div>
        <div className="info">
          관심{product.wishes} · 댓글{product.comments}
        </div>
      </Item>
    );
  });

  return (
    <Main>
      <Info>
        <Profile>
          <img
            src={
              user.img
                ? user.img.replace(/\\/gi, "/").replace(/public/gi, "")
                : alt
            }
            alt="profile"
          />
          <div>
            <div className="name">{user.nickname}</div>
            {auth.id === params.id && <Link to="/profile">수정</Link>}
          </div>
        </Profile>
        <span>
          {user.nickname}님이 판매중인 상품 {count}건
        </span>
      </Info>
      <Controls>
        <Pagination page={page} count={pages} onChange={(e, v) => setPage(v)} />
      </Controls>

      <List>{productList}</List>
    </Main>
  );
};

export default User;
