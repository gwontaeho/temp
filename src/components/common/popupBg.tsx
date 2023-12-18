import styles from "./popupBg.module.scss";

interface IProps {
  bg?: boolean;
  opacity?: number;
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PopupBg({ bg, opacity = 0.2, off }: IProps) {
  return (
    <section
      className={`${styles.popupBg} ${bg ? styles.bg : ""}`}
      style={{ opacity }}
      onClick={off}
    />
  );
}
