import { Container } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

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
