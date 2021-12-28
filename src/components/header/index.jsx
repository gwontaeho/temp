import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closeNav } from "../../redux/nav/actions";
import logo from "../../images/logo.png";
import "./index.scss";

const Header = () => {
  const hamburger = useRef();

  const dispatch = useDispatch();
  const open = useSelector((state) => state.navReducer.open);

  useEffect(() => {
    if (open) hamburger.current.classList.add("is-active");
    else hamburger.current.classList.remove("is-active");
  }, [open]);

  const onClick = useCallback(() => {
    if (open) dispatch(closeNav());
    else dispatch(openNav());
  }, [open]);

  return (
    <div className="Header">
      <img src={logo} alt="logo" />
      <div className="hamburger" ref={hamburger} onClick={onClick}>
        <div className="hamburger__container">
          <div className="hamburger__inner"></div>
          <div className="hamburger__hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
