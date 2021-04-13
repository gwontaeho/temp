import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Container } from "./styles";
import axios from "axios";

const ClassInfo = ({ match }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(async () => {
    console.log(match.params.index);

    try {
      const response = await axios.post(
        "/api/classinfo",
        {
          index: match.params.index,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <Container>sdkasdsa</Container>;
};

export default ClassInfo;
