import DetailHeader from "components/header/detailHeader";
import styles from "./editProfile.module.scss";
import { D_editProfileCategoryList } from "data/my/edit/D_editProfile";
import { useState } from "react";
import PersonalInfo from "components/my/edit/personalInfo";
import { useLocation } from "react-router-dom";
import EditPw from "components/my/edit/editPw";
import Withdrawal from "components/my/edit/withdrawal";

export default function EditProfile() {
  const location = useLocation();

  const [category, setCategory] = useState<string>(
    D_editProfileCategoryList[location.state?.category || 0]
  );

  return (
    <>
      <DetailHeader title="회원정보수정" />

      <main className={styles.editProfile}>
        <article className={styles.categoryArea}>
          <ul className={styles.categoryList}>
            {D_editProfileCategoryList.map((v, i) => (
              <li
                key={i}
                className={v === category ? styles.on : ""}
                onClick={() => setCategory(v)}
              >
                {v}
              </li>
            ))}
          </ul>
        </article>

        {category === D_editProfileCategoryList[0] && <PersonalInfo />}
        {category === D_editProfileCategoryList[1] && <EditPw />}
        {category === D_editProfileCategoryList[2] && <Withdrawal />}
      </main>
    </>
  );
}
