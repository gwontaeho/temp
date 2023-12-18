import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeBike } from "../../redux/bike/actions";
import "./index.css";
const Detail = () => {
  const dispatch = useDispatch();

  const screenRef = useRef();
  const screenRef2 = useRef();
  const screenRef3 = useRef();
  const bike = useSelector((state) => state.bikeReducer.bike);
  const open = useSelector((state) => state.bikeReducer.open);

  useEffect(() => {
    if (open) {
      screenRef.current.style.transitionDelay = "0s";
      screenRef2.current.style.transitionDelay = "0.3s";
      screenRef3.current.style.transitionDelay = "0.5s";
      screenRef.current.style.maxHeight = "100%";
      screenRef2.current.style.maxHeight = "100%";
      screenRef3.current.style.maxHeight = "100%";
    } else {
      screenRef.current.style.transitionDelay = "0.5s";
      screenRef2.current.style.transitionDelay = "0.3s";
      screenRef3.current.style.transitionDelay = "0s";
      screenRef.current.style.maxHeight = "0";
      screenRef2.current.style.maxHeight = "0";
      screenRef3.current.style.maxHeight = "0";
    }
  }, [open]);

  const onClick = useCallback(() => {
    dispatch(closeBike());
  }, []);

  return (
    <div className="Detail">
      <div className="screen" ref={screenRef} />
      <div className="screen2" ref={screenRef2} />
      <div className="screen3" ref={screenRef3}>
        <div className="Detail-header" onClick={onClick}>
          {bike.name}
        </div>
        <div className="Detail-container">
          {bike.images.map((image) => {
            return (
              <div>
                <img src={image} />
              </div>
            );
          })}
          <div className="Detail-specifications">
            <div className="Detail-title">DIMENSIONS</div>
            <div className="Detail-specification">
              <div>
                <div>전장</div>
                <div>전폭</div>
                <div>전고</div>
                <div>휠베이스</div>
                <div>최저 지상고</div>
                <div>시트 높이</div>
                <div>커브 매스</div>
                <div>연료 탱크 용량</div>
              </div>
              <div>
                <div>{bike.dimensions.전장}</div>
                <div>{bike.dimensions.전폭}</div>
                <div>{bike.dimensions.전고}</div>
                <div>{bike.dimensions.최저지상고}</div>
                <div>{bike.dimensions.시트높이}</div>
                <div>{bike.dimensions.커브매스}</div>
                <div>{bike.dimensions.연료탱크용량}</div>
              </div>
            </div>
            <div className="Detail-title">ENGINE</div>
            <div className="Detail-specification">
              <div>
                <div>배기량</div>
              </div>
              <div>
                <div>{bike.engine.배기량}</div>
              </div>
            </div>
            <div className="Detail-title">PERFORMANCE</div>
            <div className="Detail-specification">
              <div>
                <div>최고출력</div>
                <div>최대토크</div>
              </div>
              <div>
                <div>{bike.performance.최고출력}</div>
                <div>{bike.performance.최대토크}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
