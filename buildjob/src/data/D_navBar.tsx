import { ReactComponent as Home } from "assets/images/icon/Home.svg";
import { ReactComponent as HomeFill } from "assets/images/icon/HomeFill.svg";
import { ReactComponent as Bag } from "assets/images/icon/Bag.svg";
import { ReactComponent as BagFill } from "assets/images/icon/BagFill.svg";
import { ReactComponent as Search } from "assets/images/icon/Search.svg";
import { ReactComponent as SearchFill } from "assets/images/icon/SearchFill.svg";
import { ReactComponent as Location } from "assets/images/icon/Location.svg";
import { ReactComponent as LocationFill } from "assets/images/icon/LocationFill.svg";
import { ReactComponent as Smile } from "assets/images/icon/Smile.svg";
import { ReactComponent as SmileFill } from "assets/images/icon/SmileFill.svg";

export const D_bottomNavBarList: Inav[] = [
  {
    icon: <Home />,
    activeIcon: <HomeFill />,
    label: "홈",
    url: "/home",
  },
  {
    icon: <Bag />,
    activeIcon: <BagFill />,
    label: "채용",
    url: "/hire",
  },
  {
    icon: <Search />,
    activeIcon: <SearchFill />,
    label: "인재찾기",
    url: "/person",
  },
  {
    icon: <Location />,
    activeIcon: <LocationFill />,
    label: "가맹점",
    url: "/franchisee",
  },
  {
    icon: <Smile />,
    activeIcon: <SmileFill />,
    label: "MY",
    url: "/mypage",
  },
];
