import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axiosInstance from "../../axios";
import { start, end } from "../../features/loading";
import alt from "../../image/alt.png";
import { Main, Header, Controls, List, Item } from "./styles";

const Wish = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(0);
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    getWish();
  }, [page]);

  const getWish = useCallback(async () => {
    try {
      dispatch(start());
      const response = await axiosInstance.get(`/api/wish?page=${page}`, {
        headers: {
          token: auth.token,
        },
      });
      setPages(Math.ceil(response.data.count / 6));
      setCount(response.data.count);
      setWishes(response.data.rows);
    } catch (error) {
      console.log(error);
    }
    dispatch(end());
  }, [page]);

  const list = wishes.map((wish) => {
    const src =
      JSON.parse(wish.product.img).length === 0 || !wish.product.img
        ? alt
        : JSON.parse(wish.product.img)[0];

    return (
      <Item key={wish.id}>
        <Link to={`/product/${wish.product.id}`}>
          <img
            src={src}
            alt={wish.name}
            onError={(e) => (e.target.src = alt)}
          />
        </Link>
        <div className="name">{wish.product.name}</div>
        <div className="price">
          {Number(wish.product.price).toLocaleString()}원
        </div>
        <div>{wish.product.address}</div>
        <div className="info">
          관심{wish.product.wishes} · 댓글{wish.product.comments}
        </div>
      </Item>
    );
  });

  return (
    <Main>
      <Header>
        {!loading.current &&
          (count === 0
            ? `관심목록에 추가한 상품이 없습니다`
            : `${count}건의 관심상품이 있습니다`)}
      </Header>
      <Controls>
        <Pagination count={pages} onChange={(e, v) => setPage(v)} />
      </Controls>
      {count === 0 && <div className="wish-text"></div>}
      <List>{list}</List>
    </Main>
  );
};

export default Wish;
