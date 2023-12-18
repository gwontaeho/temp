import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import { useSelector } from "react-redux";

import { Container } from "./styles";

const User = loadable(() => import("./user"));
const Seller = loadable(() => import("./seller"));

const Info = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.type === 0) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      {auth.type === 1 ? <User /> : auth.type === 2 ? <Seller /> : null}
    </Container>
  );
};

export default Info;
