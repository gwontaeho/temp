import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";
import { Container, Header } from "./styles";

const Classes = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/classes",
          {},
          {
            headers: {
              token: cookies.token,
            },
          }
        );

        let newClasses = [...response.data];
        setClasses(newClasses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const classList = classes.map((v) => {
    return (
      <Link to={`/info/class/${v.index}`}>
        <img src={v.img.replace(/\\/gi, "/").replace(/public/gi, "")} />
        {v.name}
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

export default Classes;
