import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import axios from "axios";

import { Container, Header, Nav } from "./styles";

const UserReviewHistory = loadable(() => import("./user_review_history"));
const UserReviewUnwritten = loadable(() => import("./user_review_unwritten"));

const UserReview = () => {
  return (
    <Container>
      <Header>수강 후기</Header>
      <Nav>
        <Link to="/info/review">후기 내역</Link>
        <Link to="/info/review/unwritten">후기 작성</Link>
      </Nav>
      <Switch>
        <Route exact path="/info/review" component={UserReviewHistory} />
        <Route
          exact
          path="/info/review/unwritten"
          component={UserReviewUnwritten}
        />
      </Switch>
    </Container>
  );
};

export default UserReview;
