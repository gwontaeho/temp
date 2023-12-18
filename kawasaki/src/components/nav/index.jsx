import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./index.css";
import data from "../../data";
import { setBikes } from "../../redux/bikes/actions";
import { closeNav } from "../../redux/nav/actions";

const Nav = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.navReducer.open);

  const screenRef = useRef();
  const screen2Ref = useRef();

  useEffect(() => {
    if (open) {
      screenRef.current.style.transitionDelay = "0s";
      screen2Ref.current.style.transitionDelay = "0.3s";
      screenRef.current.style.maxHeight = "100%";
      screen2Ref.current.style.maxHeight = "100%";
    } else {
      screenRef.current.style.transitionDelay = "0.3s";
      screen2Ref.current.style.transitionDelay = "0s";
      screen2Ref.current.style.maxHeight = "0";
      screenRef.current.style.maxHeight = "0";
    }
  }, [open]);

  const onClickCategory = useCallback((bikes) => {
    dispatch(setBikes(bikes));
    dispatch(closeNav());
  }, []);

  return (
    <div className="Nav">
      <div className="screen" ref={screenRef} />
      <div className="screen2" ref={screen2Ref}>
        {data.map((category) => {
          return (
            <div
              key={category.name}
              onClick={() => onClickCategory(category.bikes)}
            >
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
