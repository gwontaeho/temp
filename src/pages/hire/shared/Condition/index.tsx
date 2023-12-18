import Map from "assets/images/bg/hire/Map.png";
import { ReactComponent as Call } from "assets/images/icon/Call.svg";
import { ReactComponent as NavMarker } from "assets/images/icon/NavMarker.svg";
import PopupBg from "components/common/popupBg";
import { useJobPost } from "hooks/useJobPost";
import { useUuid } from "hooks/useUuid";
import Inquiries from "pages/hire/hireDetail/Inquiries";
import { useState } from "react";
import { kakaoMapUrl } from "utils/mapUrl";
import CallPopup from "../CallPopup";
import Details from "../Details";
import styles from "./index.module.scss";

export default function Condition() {
  const uuid = useUuid();
  const {
    data: {
      payAmount,
      expiresAt,
      gender,
      ages,
      workExperienceDuration,
      streetAddress,
      detailAddress,
      durationOfhire,
      workdaysOfweek,
      workHours,
      restHoursInMinutes,
      employType,
      jobType,
      managerName,
      phoneNumber,
      latitude,
      longitude,
      corporationName,
    },
  } = useJobPost(uuid);

  const [callPopup, setCallPopup] = useState<boolean>(false);

  return (
    <>
      <article className={styles.conditionArea}>
        <div className={`${styles.conditionCont} ${styles.contCont}`}>
          <div className={styles.keyBar}>
            <p className={styles.contKey}>모집조건</p>
          </div>

          <div className={styles.contValue}>
            <ul className={styles.conditionList}>
              <li>
                <p className={styles.key}>모집마감</p>
                <p className={styles.value}>{expiresAt}</p>
              </li>
              <li>
                <p className={styles.key}>모집인원</p>
                <p className={styles.value}>2명</p>
              </li>
              <li>
                <p className={styles.key}>성별</p>
                <p className={styles.value}>{gender}</p>
              </li>
              <li>
                <p className={styles.key}>연령</p>
                <p className={styles.value}>{ages}</p>
              </li>
              <li>
                <p className={styles.key}>경력</p>
                <p className={styles.value}>{workExperienceDuration}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.locCont} ${styles.contCont}`}>
          <div className={styles.keyBar}>
            <p className={styles.contKey}>근무지역</p>
          </div>

          <div className={styles.contValue}>
            <p className={styles.text}>
              {streetAddress} {detailAddress}
            </p>

            {latitude && longitude && (
              <button
                className={styles.mapBtn}
                style={{
                  background: `url(${Map}) no-repeat center center/cover`,
                }}
                onClick={() => {
                  const url = kakaoMapUrl({
                    latitude,
                    longitude,
                    displayAddress: `${corporationName}: ${streetAddress} ${detailAddress}`,
                  });
                  window.open(url);
                }}
              >
                <div className={styles.label}>
                  <NavMarker />
                  <p>지도보기</p>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className={`${styles.conditionCont} ${styles.contCont}`}>
          <div className={styles.keyBar}>
            <p className={styles.contKey}>근무조건</p>
          </div>

          <div className={styles.contValue}>
            <ul className={styles.conditionList}>
              <li>
                <p className={styles.key}>급여</p>
                <p
                  className={`${styles.value} ${styles.blue}`}
                >{`${Intl.NumberFormat().format(
                  Number(payAmount) * 10000
                )}원`}</p>
              </li>
              <li>
                <p className={styles.key}>근무기간</p>
                <p className={styles.value}>{durationOfhire}</p>
              </li>
              <li>
                <p className={styles.key}>근무요일</p>
                <p className={styles.value}>
                  {workdaysOfweek == null && "요일 협의"}
                  {workdaysOfweek != null && (
                    <>
                      주{workdaysOfweek.length}일{" "}
                      <span className={styles.gray}>
                        {workdaysOfweek.join(", ")}
                      </span>
                    </>
                  )}
                </p>
              </li>
              <li>
                <p className={styles.key}>근무시간</p>
                <p className={styles.value}>
                  {workHours}{" "}
                  <span className={styles.gray}>
                    (휴게시간 {restHoursInMinutes}분)
                  </span>
                </p>
              </li>
              <li>
                <p className={styles.key}>업직종</p>
                <p className={styles.value}>{jobType}</p>
              </li>
              <li>
                <p className={styles.key}>고용형태</p>
                <p className={styles.value}>{employType}</p>
              </li>
            </ul>
          </div>
        </div>

        <Details />

        <div className={`${styles.managerCont} ${styles.contCont}`}>
          <div className={styles.keyBar}>
            <p className={styles.contKey}>담장자 정보</p>
          </div>

          <div className={styles.contValue}>
            <ul className={styles.infoList}>
              <li>
                <p className={styles.key}>담당자</p>
                <div className={styles.value}>
                  <p>{managerName}</p>
                </div>
              </li>

              <li>
                <p className={styles.key}>전화번호</p>
                <div className={styles.value}>
                  <button
                    className={styles.callBtn}
                    onClick={() => setCallPopup(true)}
                  >
                    <Call />
                    <p>전화하기</p>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Inquiries />
      </article>

      {phoneNumber && callPopup && (
        <>
          <CallPopup
            off={() => setCallPopup(false)}
            phoneNumber={phoneNumber}
          />
          <PopupBg bg off={() => setCallPopup(false)} />
        </>
      )}
    </>
  );
}
