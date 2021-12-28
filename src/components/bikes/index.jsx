import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setBike } from "../../redux/bike/actions";
import "./index.css";

const Bikes = () => {
  const dispatch = useDispatch();

  const bikes = useSelector((state) => state.bikesReducer.bikes);

  const onClickBike = useCallback((bike) => {
    dispatch(setBike(bike));
  }, []);

  const onMouseMove = useCallback((e) => {
    const card = e.currentTarget.getElementsByClassName("Bikes-bike-card")[0];
    const img = card.getElementsByTagName("img")[0];
    const rotateX =
      (e.clientX -
        card.getBoundingClientRect().left -
        card.getBoundingClientRect().width / 2) /
      20;
    const rotateY =
      (e.clientY -
        card.getBoundingClientRect().top -
        card.getBoundingClientRect().height / 2) /
      20;
    card.style.transform = `rotateX(${-rotateY}deg) rotateY(${rotateX}deg)`;
    img.style.transform = `rotate(${
      (rotateX + rotateY) / 5
    }deg) translateZ(100px)`;
  }, []);

  const onMouseLeave = useCallback((e) => {
    const card = e.currentTarget.getElementsByClassName("Bikes-bike-card")[0];
    const img = card.getElementsByTagName("img")[0];
    card.style.transform = "";
    img.style.transform = "";
  }, []);

  return (
    <div className="Bikes">
      {bikes.map((bike) => {
        return (
          <div
            className="Bikes-bike"
            key={bike.name}
            onClick={() => onClickBike(bike)}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <div className="Bikes-bike-card">
              <img src={bike.profile} alt={bike.name} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bikes;
