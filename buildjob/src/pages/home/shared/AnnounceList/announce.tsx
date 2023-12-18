import { ReactComponent as Flag } from "assets/images/icon/Flag.svg";
import { ReactComponent as FlagFillBlue } from "assets/images/icon/FlagFillBlue.svg";
import { FavoriteButton } from "pages/shared/FavoriteButton";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "utils/formatJobPostData";
import styles from "./announce.module.scss";

interface Iprops {
  data: IannounceList;
}

export default function Announce({ data }: Iprops) {
  const navigate = useNavigate();

  return (
    <li
      className={styles.announce}
      onClick={() => navigate(`/hire/${data.uuid}`)}
    >
      <div className={styles.row}>
        <p className={styles.company}>{data.company}</p>
        <FavoriteButton
          uuid={data.uuid}
          savedIcon={<FlagFillBlue />}
          unsavedIcon={<Flag />}
        />
      </div>

      <h2 className={styles.announceTitle}>{data.title}</h2>

      <p className={styles.info}>
        {`${formatAddress(data.loc)} · `}
        <span className={styles.red}>{data.payType}</span> {data.pay}
      </p>
    </li>
  );
}
