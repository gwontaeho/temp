import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { getCareerStr, max, min, step } from "utils/filter";
import styles from "./careerPopup.module.scss";

interface IProps {
  career: number[] | null;
  setCareer: Function;
  off?: Function;
}

export default function CareerPopup({ career, setCareer, off }: IProps) {
  const [ranges, setRanges] = useState<number[]>(career || [0, 0]);

  function getThumbStr(int: number): string {
    let _res: string = `${ranges[int]}`;

    if (ranges[int] >= max) _res = `${max}+`;

    return _res;
  }

  function onClickResetBtn() {
    setCareer(null);
    off?.();
  }

  function onClickConfirm() {
    setCareer([...ranges]);
    off?.();
  }

  return (
    <section className={styles.careerPopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>경력</h1>

        <button className={styles.closeBtn} onClick={() => off?.()}>
          <XGray />
        </button>
      </article>

      <article className={styles.contArea}>
        <h1 className={styles.result}>{getCareerStr(ranges)}</h1>

        <div className={styles.rangeCont}>
          <Range
            values={ranges}
            step={step}
            min={min}
            max={max}
            onChange={(values) =>
              setRanges([Math.min(...values), Math.max(...values)])
            }
            renderTrack={({ props, children }) => (
              <div
                className={styles.rangeTrack}
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
              >
                <div
                  ref={props.ref}
                  className={styles.track}
                  style={{
                    background: getTrackBackground({
                      values: ranges,
                      colors: [
                        styles.RangeThumb1,
                        styles.Blue3,
                        styles.RangeThumb1,
                      ],
                      min,
                      max,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                className={`${styles.renderThumbBox} ${
                  isDragged ? styles.dragged : ""
                }`}
                {...props}
              >
                <div className={styles.renderThumb}>
                  <p>{getThumbStr(props.key)}</p>
                </div>
              </div>
            )}
          />
        </div>
      </article>

      <article className={styles.bottomBar}>
        <div className={styles.btnBox}>
          <button className={styles.resetBtn} onClick={onClickResetBtn}>
            초기화
          </button>

          <button className={styles.confirmBtn} onClick={onClickConfirm}>
            결과보기
          </button>
        </div>
      </article>
    </section>
  );
}
