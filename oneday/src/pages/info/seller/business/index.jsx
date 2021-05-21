import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Container } from "./styles";

const Business = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(async () => {
    try {
      const response = await axios.post(
        "/api/auth/seller",
        {},
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Container></Container>;
};

export default Business;
