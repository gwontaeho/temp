import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

export const Nav = () => {
    return (
        <Container>
            <Link to="/">목록</Link>
            <Link to="/write">등록</Link>
        </Container>
    );
};
