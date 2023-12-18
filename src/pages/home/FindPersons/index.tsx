import { useQuery } from "@tanstack/react-query";
import { ReactComponent as StarFill } from "assets/images/icon/StarFill.svg";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { api, eps } from "utils/config";
import styles from "../index.module.scss";

export function FindPersons() {
  return (
    <Suspense>
      <Resolved />
    </Suspense>
  );
}

function Resolved() {
  const navigate = useNavigate();
  const { data: persons } = usePersons();

  return (
    <article className={styles.contArea}>
      <ul className={styles.personList}>
        {persons.map((v, i) => (
          <li
            key={i}
            onClick={() => navigate(`/person/${i}`, { state: { uuid: v.id } })}
          >
            <img className={styles.profImg} src={v.img} alt="" />

            <div className={styles.contCont}>
              <div className={styles.statusBar}>
                <h3 className={styles.name}>{v.name}</h3>
                <p className={styles.status}>{v.status}</p>
              </div>

              <p className={styles.message}>{v.message}</p>

              <div className={styles.scoreBar}>
                <ul className={styles.scoreList}>
                  {new Array(5).fill("").map((v, i) => (
                    <StarFill key={i} />
                  ))}
                </ul>

                <p className={styles.score}>{v.score}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function usePersons() {
  const { data, ...rest } = useQuery(["GET_PERSONS"], async () => {
    const { data } = await api.get(eps["GET_PERSONS"](0, 3));

    return data.list.map((item: any) => ({
      id: item.useruuid,
      img: item.urlprofileimage,
      name: item.username,
      status: "",
      message: item.note_,
      score: Number(item.rating ?? "0"),
    })) as IpersonSimple[];
  });

  return { data: data!, ...rest };
}
