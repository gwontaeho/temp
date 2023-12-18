import { useMutation, useQuery } from "@tanstack/react-query";
import EnableAlarmPopup from "components/alarm/enableAlarmPopup";
import DetailHeader from "components/header/detailHeader";
import {
  notificationsMap,
  notificationsMapWithServerKey,
} from "data/D_notifications";
import { queryClient } from "providers/ReactQueryProvider";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./alarmSetting.module.scss";

export default function AlarmSetting() {
  const location = useLocation();
  const enableAlarmPopup: boolean = location.state?.enablePopup || false;

  return (
    <>
      <DetailHeader title="알림설정" bottomBorder />

      <main className={styles.alarmSetting}>
        {enableAlarmPopup && <EnableAlarmPopup />}

        <section className={styles.settingSec}>
          <article className={styles.settingArea}>
            <div className={styles.articleTitleBar}>
              <h1 className={styles.articleTitle}>앱 푸시</h1>

              <Suspense>
                <Resovled />
              </Suspense>
            </div>
          </article>

          {/* <article className={styles.settingArea}>
          <div className={styles.articleTitleBar}>
            <h1 className={styles.articleTitle}>문자 메시지</h1>

            <ul className={styles.settingList}>
              <li>
                <div className={styles.contBox}>
                  <h2 className={styles.settingTitle}>지원 상태 알림</h2>
                  <h3 className={styles.settingExplain}>
                    이력서 알림 및 지원 상태 알림
                  </h3>
                </div>

                <button
                  className={`${snsWatch("event") ? styles.on : ""} ${
                    styles.toggleBtn
                  }`}
                  onClick={() => snsSetValue("event", !snsWatch("event"))}
                >
                  <span className={styles.thumb} />
                </button>
              </li>
            </ul>
          </div>
        </article> */}
        </section>
      </main>
    </>
  );
}

function Resovled() {
  const { data: alarmsMap } = useAlarms();
  const { mutateAsync: onSubmitChangeAlarm, isLoading } = useSubmitAlarm();
  const {
    setValue: appPushSetValue,
    watch: appPushWatch,
    reset,
  } = useForm<IappPush>({
    defaultValues: alarmsMap,
  });

  useEffect(() => {
    if (alarmsMap) {
      reset(alarmsMap);
    }
  }, [alarmsMap, reset]);

  return (
    <ul className={styles.settingList}>
      <li>
        <div className={styles.contBox}>
          <h2 className={styles.settingTitle}>지원 상태 알림</h2>
          <h3 className={styles.settingExplain}>
            이력서 알림 및 지원 상태 알림
          </h3>
        </div>

        <button
          className={`${appPushWatch("applyStatus") ? styles.on : ""} ${
            styles.toggleBtn
          }`}
          disabled={isLoading}
          onClick={async () => {
            await onSubmitChangeAlarm(notificationsMap["applyStatus"]);
            appPushSetValue("applyStatus", !appPushWatch("applyStatus"));
          }}
        >
          <span className={styles.thumb} />
        </button>
      </li>

      <li>
        <div className={styles.contBox}>
          <h2 className={styles.settingTitle}>공고 제안 알림</h2>
          <h3 className={styles.settingExplain}>기업의 입사 제안 알림</h3>
        </div>

        <button
          className={`${appPushWatch("jobOpening") ? styles.on : ""} ${
            styles.toggleBtn
          }`}
          disabled={isLoading}
          onClick={async () => {
            await onSubmitChangeAlarm(notificationsMap["jobOpening"]);
            appPushSetValue("jobOpening", !appPushWatch("jobOpening"));
          }}
        >
          <span className={styles.thumb} />
        </button>
      </li>

      <li>
        <div className={styles.contBox}>
          <h2 className={styles.settingTitle}>지인 추천 알림</h2>
          <h3 className={styles.settingExplain}>
            추천을 받았거나 추천사 작성 요청 알림
          </h3>
        </div>

        <button
          className={`${appPushWatch("recommended") ? styles.on : ""} ${
            styles.toggleBtn
          }`}
          disabled={isLoading}
          onClick={async () => {
            await onSubmitChangeAlarm(notificationsMap["recommended"]);
            appPushSetValue("recommended", !appPushWatch("recommended"));
          }}
        >
          <span className={styles.thumb} />
        </button>
      </li>

      <li>
        <div className={styles.contBox}>
          <h2 className={styles.settingTitle}>댓글 알림</h2>
          <h3 className={styles.settingExplain}>
            새로운 댓글, 내 댓글 관련 알림
          </h3>
        </div>

        <button
          className={`${appPushWatch("reply") ? styles.on : ""} ${
            styles.toggleBtn
          }`}
          disabled={isLoading}
          onClick={async () => {
            await onSubmitChangeAlarm(notificationsMap["reply"]);
            appPushSetValue("reply", !appPushWatch("reply"));
          }}
        >
          <span className={styles.thumb} />
        </button>
      </li>

      <li>
        <div className={styles.contBox}>
          <h2 className={styles.settingTitle}>혜택/이벤트 알림</h2>
          <h3 className={styles.settingExplain}>
            커리어 성장에 도움되는 정보 (혜택, 이벤트) 알림
          </h3>
        </div>

        <button
          className={`${appPushWatch("event") ? styles.on : ""} ${
            styles.toggleBtn
          }`}
          disabled={isLoading}
          onClick={async () => {
            await onSubmitChangeAlarm(notificationsMap["event"]);
            appPushSetValue("event", !appPushWatch("event"));
          }}
        >
          <span className={styles.thumb} />
        </button>
      </li>
    </ul>
  );
}

function useSubmitAlarm() {
  const user = useRecoilValue(userSelector);

  return useMutation(async (key: AlarmKey) => {
    await api.put(eps["CHANGE_ALARM_SETTING"], {
      key: {
        key_: key,
      },
      targetcolumnname: "value",
    });
    await queryClient.invalidateQueries(["MY_ALARMS_SETTING", user]);
  });
}

function useAlarms() {
  const user = useRecoilValue(userSelector);
  const { data, ...rest } = useQuery(["MY_ALARMS_SETTING", user], async () => {
    const { data } = await api.get(eps["MY_ALARMS_SETTING"]);

    if (data.status === "ERR") {
      throw new Error("invalid request");
    }

    const _map = (data.list ?? []).reduce(
      (
        acc: Record<AlarmKey, { key: AlarmKey; isActive: boolean }>,
        cur: any
      ) => {
        const key = cur.key_ as AlarmKey;

        return {
          ...acc,
          [notificationsMapWithServerKey[key]]: cur.value === "1",
        };
      },
      {}
    );

    return Object.keys(notificationsMap)
      .map((key) => {
        if (_map[key]) {
          return { key, isActive: _map[key] };
        } else {
          return { key, isActive: false };
        }
      })
      .reduce((acc, cur) => {
        return {
          ...acc,
          [cur.key]: cur.isActive,
        };
      }, {});
  });

  return { data: data!, ...rest };
}
