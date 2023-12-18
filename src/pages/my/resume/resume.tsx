import DetailHeader from "components/header/detailHeader";
import styles from "./resume.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AutoSavePopup from "components/my/resume/autoSavePopup";
import ResumeOfList from "components/my/resume/resumeOfList";
import LetsEnrollPopup from "components/my/resume/letsEnrollPopup";
import { api, eps } from "utils/config";
import moment from 'moment';
import { toast } from "react-toastify";

export default function Resume() {
  const location = useLocation();

  const [autoSave, setAutoSave] = useState<boolean>(
    location.state?.autoSave || false
  );
  const [resumeList, setResumeList] = useState<IresumeSimple[]>([]);
  const [letsEnrollPopup, setLetsEnrollPopup] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<any>(null);
  const [recentResumeUUID, setRecentResumeUUID] = useState<string | undefined>('');

  async function getUserStatus() {
    try {
      let { data }  = await api.get(eps["USERSTATUS"]);
      setUserStatus(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteHandler(index: number) {
    try {
      await api.delete(eps["CHANGE_RESUME"](index));
      queryResumeList();
      toast("이력서가 삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleState(obj: IresumeSimple) {
    try {
      let {data : {status}} = await api.put(eps["TOGGLE_RESUME"](String(obj.uuid)));
      if (!obj.lock) toast("이력서가 공개 되었습니다.", {position: toast.POSITION.TOP_LEFT});
      else toast("이력서가 비공개 되었습니다.", {position: toast.POSITION.TOP_LEFT});
      queryResumeList();
    } catch (err) {
      console.log(err);
    }
  }

  async function queryResumeList() {
    try {
      try {
        let { data: { list } } = await api.get(eps["RESUMES"](0, 10));
        let processedList = [];
        let i: any;
        for (i in list) {
          processedList.push({
            id: list[i]["id"],
            date: moment(list[i]["updatedat"]).format('YYYY.MM.DD'),
            lock: list[i]["isdefault"] === 1 ? true : false,
            name: list[i]["username"],
            location: list[i]["region"],
            category: list[i]["jobtype"],
            uuid: list[i]["uuid"],
            iscomplete: list[i]["iscomplete"] === 1 ? true : false,
          })
        }
        if (processedList.length === 0) setLetsEnrollPopup(true);
        else setLetsEnrollPopup(false);
        setResumeList(processedList)
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    queryResumeList()
    getUserStatus()
  }, []);

  useEffect(() => {
    if (userStatus?.countresumesincomplete > 0) {
      setAutoSave(true);
      for (var i=0; i<resumeList.length; i++)
        if(!resumeList[i].iscomplete) {
          setRecentResumeUUID(resumeList[i].uuid);
          break;
        }
    }
    else setAutoSave(false);
  }, [userStatus, resumeList]);

  return (
    <>
      <DetailHeader title="내 이력서" bottomBorder />

      <main className={styles.resume}>
        {autoSave && 
          <AutoSavePopup 
            recentResumeUUID={recentResumeUUID}
            count={userStatus ? userStatus.countresumesincomplete : 0} />
        }
        {letsEnrollPopup && <LetsEnrollPopup />}

        <section className={styles.resumeSec}>
          <ul className={styles.resumeList}>
            {resumeList.map((v, i) => (
              <ResumeOfList
                key={i}
                index={i}
                list={resumeList}
                uuid={v.uuid}
                setList={setResumeList}
                toggleFunc={toggleState}
                delFunc={deleteHandler}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
