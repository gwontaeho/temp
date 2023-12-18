export const notificationsMap: Record<keyof IappPush, AlarmKey> = {
  applyStatus: "notify-apply",
  jobOpening: "notify-jobpost",
  recommended: "notify-refer",
  reply: "notify-comment",
  event: "notify-benefit",
};

export const notificationsMapWithServerKey: Record<AlarmKey, keyof IappPush> = {
  "notify-apply": "applyStatus",
  "notify-jobpost": "jobOpening",
  "notify-refer": "recommended",
  "notify-comment": "reply",
  "notify-benefit": "event",
};
