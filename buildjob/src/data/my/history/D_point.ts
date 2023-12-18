import PayBack from "assets/images/icon/PayBack.svg";
import ShoppingBag from "assets/images/icon/ShoppingBag.svg";

export const D_pointList: IpointSimple[] = [
  {
    icon: PayBack,
    content: "1월 급여 리워드",
    amount: 2700000,
    time: "20:02",
    catrgory: "적립",
  },
];

export const D_paymentList: IpaymentSimple[] = [
  {
    icon: ShoppingBag,
    content: "월마트",
    amount: -20000,
    time: "22:58",
    catrgory: "결제",
  },
  {
    icon: ShoppingBag,
    content: "월마트",
    amount: 20000,
    time: "22:58",
    catrgory: "결제취소",
  },
];
