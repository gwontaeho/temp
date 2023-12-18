interface IpayHistorySimple {
  date: string;
  status: IPayHistoryStatus;
  title: IPayhistoryTitle;
  account: string;
  amount: number;
  deadline: string;
}

type IPayHistoryStatus = "DONE" | "WAITING" | "CANCELED";

type IPayhistoryTitle = "POST-JOB" | "PAY-PENALTY";
