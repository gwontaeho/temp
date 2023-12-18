interface IappPush {
  applyStatus: boolean;
  jobOpening: boolean;
  recommended: boolean;
  reply: boolean;
  event: boolean;
}

interface IsnsPush {
  event: boolean;
}

type AlarmKey =
  | "notify-apply"
  | "notify-jobpost"
  | "notify-refer"
  | "notify-comment"
  | "notify-benefit";
