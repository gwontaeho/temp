type Ilabel = "홈" | "채용" | "인재찾기" | "가맹점" | "MY";

interface Inav {
  icon: ReactComponentElement;
  activeIcon: ReactComponentElement;
  label: Ilabel;
  url: string;
}
