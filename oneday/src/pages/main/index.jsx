import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { Container, Header, Ad, Contents, ContentsBox } from "./styles";

const Main = () => {
  const [popular, setPopular] = useState([]);
  const [newly, setNewly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/classes/popular", {});

        let popular0 = [...response.data.rows];
        popular0.sort((a, b) => {
          return b.reservations.length - a.reservations.length;
        });
        popular0 = popular0.slice(0, 5);
        console.log(popular0);
        let newly0 = [...response.data.rows];
        newly0.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        newly0 = newly0.slice(0, 5);
        console.log(newly0);

        setPopular(popular0);
        setNewly(newly0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const popluarList = popular.map((v) => {
    return (
      <Link to={`/product/${v.id}`} key={v.id} className="class">
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        <div>{v.name}</div>
        <div>{v.price}</div>
      </Link>
    );
  });

  const newlyList = newly.map((v) => {
    return (
      <Link to={`/product/${v.id}`} key={v.id} className="class">
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        <div>{v.name}</div>
        <div>{v.price}</div>
      </Link>
    );
  });

  return (
    <Container>
      <Contents>
        <Header>인기 클래스</Header>
        <ContentsBox>{popluarList}</ContentsBox>
      </Contents>

      <Contents>
        <Header>신규 클래스</Header>
        <ContentsBox>{newlyList}</ContentsBox>
      </Contents>

      <Ad>123</Ad>
    </Container>
  );
};

export default Main;
