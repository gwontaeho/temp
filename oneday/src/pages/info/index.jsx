import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadable from "@loadable/component";

import { Container } from "./styles";

const User = loadable(() => import("./user"));
const Seller = loadable(() => import("./seller"));

const Info = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [type, setType] = useState(0);

  useEffect(() => {
    requestType();
  }, []);

  const requestType = useCallback(async () => {
    try {
      const response = await axios.post(
        "/api/auth/type",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      setType(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!cookies.token) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      {type === 1 ? <User /> : type === 2 ? <Seller /> : null}
    </Container>
  );
};

export default Info;
