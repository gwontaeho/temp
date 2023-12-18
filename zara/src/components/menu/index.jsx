import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Container, Button, Nav } from "./styles";
import { setNav, closeMenu } from "../../redux/menu/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useSelector((state) => state.menu);

  const onClickSetNav = useCallback((nav) => {
    dispatch(setNav(nav));
  }, []);

  const onClickCloseMenu = useCallback(() => {
    dispatch(closeMenu());
  }, []);

  const onClickNavigateCategory = useCallback(() => {
    dispatch(closeMenu());
    navigate("category");
  }, []);

  const navs = ["WOMAN", "MAN", "KIDS", "BEAUTY", "SHOES & BAGS"].map((nav) => {
    const className = menu.nav === nav ? " current" : " others";

    return (
      <div key={nav}>
        <div
          onClick={() => onClickSetNav(nav)}
          className={`nav${menu.nav ? className : ""}`}
        >
          {nav}
        </div>
        {menu.nav === nav && (
          <div className="category">
            {[
              "패딩",
              "코트 | 자켓",
              "니트 | 가디건",
              "티셔츠 | 맨투맨",
              "팬츠",
            ].map((category) => {
              return (
                <div key={category} onClick={onClickNavigateCategory}>
                  {category}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  return (
    <Container className={menu.open ? "open" : "close"}>
      <Button onClick={onClickCloseMenu}>
        <svg viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 5.3 5.957 l 0.707 -0.707 l 12.728 12.728 l -0.707 0.707 L 5.3 5.957 Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 6.007 18.685 l -0.707 -0.707 L 18.028 5.25 l 0.707 0.707 L 6.007 18.685 Z"
          />
        </svg>
      </Button>
      <Nav>{navs}</Nav>
    </Container>
  );
};

export default Menu;
