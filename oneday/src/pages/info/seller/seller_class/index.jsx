import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSelector } from "react-redux";

import { Container, Header } from "./styles";

const SellerClass = () => {
  const auth = useSelector((state) => state.auth);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    requestClass();
  }, []);

  const requestClass = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/product/seller/all",
        {},
        {
          headers: {
            token: auth.token,
          },
        }
      );
      setClasses(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const classList = classes.map((v) => {
    return (
      <Link to={`/info/class/${v.id}`} key={v.id}>
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        <div>{v.name}</div>
      </Link>
    );
  });

  return (
    <Container>
      <Header>클래스 관리</Header>
      <div className="btns">
        <Link to="/info/create">클래스 생성</Link>
      </div>
      <div className="classes">{classList}</div>
    </Container>
  );
};

export default SellerClass;
