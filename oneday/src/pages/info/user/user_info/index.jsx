import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Info, Button } from "./styles";

const UserInfo = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState({});

  useEffect(() => {
    requestUser();
  }, []);

  const requestUser = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/user",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Info></Info>
      <Button>
        <Link
          to={{
            pathname: "/info/modify",
            state: { data },
          }}
        >
          수정
        </Link>
      </Button>
    </Container>
  );
};

export default UserInfo;
