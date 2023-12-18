import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { openMenu } from "../../redux/menu/actions";
import { Container, Button, Logo } from "./styles";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickOpenMenu = useCallback(() => {
    dispatch(openMenu());
  }, []);

  const onClickNavigateHome = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <Container>
      <Button onClick={onClickOpenMenu}>
        <svg viewBox="0 0 18 14">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 18 1.75 H 0 V 0.25 h 18 v 1.5 Z m 0 6 H 0 v -1.5 h 18 v 1.5 Z m 0 6 H 0 v -1.5 h 18 v 1.5 Z"
          />
        </svg>
      </Button>
      <Logo onClick={onClickNavigateHome}>
        <svg viewBox="0 0 132 55">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 105.673 0.035 l 19.557 53.338 l 6.77 0.002 v 0.383 h -21.548 v -0.383 h 6.344 l -6.431 -17.54 H 97.311 v 0.007 l 0.07 0.204 c 0.521 1.548 0.78 3.17 0.764 4.803 v 6.575 c 0 3.382 1.494 6.81 4.347 6.81 c 1.675 0 3.012 -0.59 4.604 -2.046 l 0.227 0.211 C 105.594 54.224 103.5 55 100.36 55 c -2.37 0 -4.398 -0.57 -6.03 -1.693 l -0.309 -0.222 c -2.148 -1.624 -3.542 -4.278 -4.142 -7.89 l -0.096 -0.583 l -0.1 -0.882 l -0.01 -0.152 l -3.599 9.792 h 5.107 v 0.384 H 80.496 v -0.384 h 5.162 l 3.951 -10.753 v -0.023 a 34.924 34.924 0 0 1 -0.075 -1.906 v -4.693 c 0 -5.77 -4.29 -9.08 -11.771 -9.08 H 70.41 v 26.458 h 6.371 v 0.383 h -24.9 v -0.383 h 6.345 l -6.431 -17.54 H 33.948 l -6.371 17.346 l 0.266 -0.044 c 8.366 -1.442 12.213 -7.827 12.265 -14.55 h 0.388 v 15.171 H 0 L 30.06 2.185 H 17.972 C 7.954 2.185 3.42 9.922 3.35 17.635 h -0.387 V 1.8 h 36.488 l -0.222 0.385 L 9.396 53.373 h 15.695 c 0.39 0 0.778 -0.019 1.169 -0.05 c 0.26 -0.018 0.522 -0.044 0.788 -0.077 l 0.095 -0.01 L 46.703 0 h 0.387 l 0.013 0.035 l 15.369 41.916 V 2.185 h -6.328 v -0.39 h 21.778 c 10.467 0 17.774 5.372 17.774 13.068 c 0 5.612 -5.005 10.27 -12.45 11.595 l -1.367 0.174 l 1.377 0.14 c 4.515 0.517 8.1 1.906 10.641 4.127 l 0.017 0.016 L 105.273 0 h 0.386 l 0.014 0.035 Z m -8.552 35.32 l 0.038 0.094 h 13.061 l -8.773 -23.928 l -7.221 19.67 l 0.039 0.037 l 0.367 0.364 a 11.876 11.876 0 0 1 2.489 3.762 Z M 70.415 26.53 V 2.185 h 5.611 c 7.496 0 11.454 4.414 11.454 12.76 c 0 8.877 -2.272 11.585 -9.717 11.585 h -7.348 Z M 42.882 11.521 L 34.09 35.45 h 17.565 L 42.882 11.52 Z"
          />
        </svg>
      </Logo>
    </Container>
  );
};

export default Header;
