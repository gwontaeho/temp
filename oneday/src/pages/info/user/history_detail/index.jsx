import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import { Container, Header, ClassInfo } from "./styles";

const HistoryDetail = ({ match }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/reservation/history/detail",
          {
            id: match.params.id,
          },
          {
            headers: {
              token: cookies.token,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(match.params.id);
  }, []);

  return Object.keys(data).length === 0 ? null : (
    <Container>
      <Header>예약 상세</Header>
      <ClassInfo>
        <img
          src={data.class.img.replace(/\\/gi, "/").replace(/public/gi, "")}
        />
        <div>
          <div>{data.class.name}</div>
          <div>{data.sellerId}</div>
        </div>
      </ClassInfo>
    </Container>
  );
};

export default HistoryDetail;
