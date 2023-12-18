import { ReactComponent as Flag } from "assets/images/icon/Flag.svg";
import { ReactComponent as FlagFillBlue } from "assets/images/icon/FlagFillBlue.svg";
import { useSaveFavorite } from "hooks/useSaveFavorite";
import { useReducer } from "react";
import styles from "../index.module.scss";

interface Props {
  uuid: string;
}

export function FavoriteButton({ uuid }: Props) {
  const { mutateAsync: onSaveFavorite } = useSaveFavorite();
  const [isFavorite, toggle] = useReducer((prev) => !prev, true);

  return (
    <button
      className={styles.utilBtn}
      onClick={async (e) => {
        e.stopPropagation();
        await onSaveFavorite(uuid);
        toggle();
      }}
    >
      {isFavorite && <FlagFillBlue />}
      {!isFavorite && <Flag />}
    </button>
  );
}
