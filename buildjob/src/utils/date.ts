const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DATE_IN_MS = HOUR_IN_MS * 24;

export const getDateDiffFromNow = (updatedAt: Date) => {
  const nowDate = new Date();
  const diffMs = +nowDate - +updatedAt;

  // if (diffMs < 0) {
  //   return { text: `0초`, type: 'second', diff: 0 }
  // }

  if (diffMs < MINUTE_IN_MS) {
    // return { text: `${Math.floor(diffMs / SECOND)}초`, type: 'second', diff: diffMs }
    return { text: "방금 전", type: "second", diff: diffMs };
  } else if (diffMs < HOUR_IN_MS) {
    return {
      text: `${Math.floor(diffMs / MINUTE_IN_MS)}분 전`,
      type: "minute",
      diff: diffMs,
    };
  } else if (diffMs < DATE_IN_MS) {
    return {
      text: `${Math.floor(diffMs / HOUR_IN_MS)}시간 전`,
      type: "hour",
      diff: diffMs,
    };
  } else if (diffMs < DATE_IN_MS * 30) {
    return {
      text: `${Math.floor(diffMs / DATE_IN_MS)}일 전`,
      type: "date",
      diff: diffMs,
    };
  }

  const nowYear = nowDate.getFullYear();
  const updatedYear = updatedAt.getFullYear();
  const yearDiff = nowYear - updatedYear;
  const nowMonth = nowDate.getMonth() + 1;
  const updatedMonth = updatedAt.getMonth() + 1;

  if (nowMonth === updatedMonth) {
    if (yearDiff) {
      if (nowDate.getDate() < updatedAt.getDate()) {
        return yearDiff === 1
          ? { text: `12개월 전`, type: "month", diff: diffMs }
          : { text: `${yearDiff - 1}년 전`, type: "year", diff: diffMs };
      } else {
        return { text: `${yearDiff}년 전`, type: "year", diff: diffMs };
      }
    } else {
      return { text: `1개월 전`, type: "month", diff: diffMs };
    }
  } else if (nowMonth > updatedMonth) {
    if (nowYear > updatedYear) {
      return { text: `${nowYear - updatedYear}년`, type: "year", diff: diffMs };
    } else {
      return {
        text: `${nowMonth - updatedMonth || 1}개월 전`,
        type: "month",
        diff: diffMs,
      };
    }
  } else {
    if (nowYear > updatedYear + 1) {
      return { text: `${nowYear - updatedYear}년`, type: "year", diff: diffMs };
    } else {
      return {
        text: `${12 - updatedMonth + nowMonth}개월 전`,
        type: "month",
        diff: diffMs,
      };
    }
  }
};
