import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";

import axios from "axios";

const Detail = (props) => {
  useEffect(() => {
    console.log(JSON.parse(props.detailArray));
  }, []);

  const detailList = JSON.parse(props.detailArray).map((v) => {
    return (
      <div>
        <div className="title">{v.title}</div>
        <div className="text">
          <pre>{v.text}</pre>
        </div>
      </div>
    );
  });

  return <Container>{detailList}</Container>;
};

export default Detail;
