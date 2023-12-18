import { D_bottomNavBarList } from "data/D_navBar";
import styles from "./bottomNavBar.module.scss";
import { useNavigate } from "react-router-dom";

interface Iprops {
  activeLabel: Ilabel;
}

export default function BottomNavBar({ activeLabel }: Iprops) {
  const navigate = useNavigate();

  return (
    <ul className={styles.bottomNavBar}>
      {D_bottomNavBarList.map((v, i) => (
        <li key={i} onClick={() => navigate(v.url)}>
          {activeLabel === v.label ? v.activeIcon : v.icon}
          <p>{v.label}</p>
        </li>
      ))}
    </ul>
  );
}
