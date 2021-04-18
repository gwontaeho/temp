import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Container } from "./styles";
import axios from "axios";

const ManageClass = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [classes, setClasses] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.post(
        "/api/loadclass",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );

      let newClasses = [...response.data];
      console.log(newClasses);
      setClasses(newClasses);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const classList = classes.map((v) => {
    return (
      <div key={v.class + v.id} style={{ cursor: "pointer", margin: "12px" }}>
        <Link to={`/info/classinfo/${v.index}`}>{v.class}</Link>
      </div>
    );
  });

  return (
    <Container>
      {classList}
      <Link to="/info/createclass">클래스 생성</Link>
    </Container>
  );
};

export default ManageClass;
