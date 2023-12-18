export function formatPay(payAmount: string) {
  return `${Intl.NumberFormat().format(Number(payAmount) * 10000)}원`;
}

export function formatWorkExperienceDuration(str: string | null) {
  // MEMO: temporary solution here
  if (str == null) {
    return "신입213";
  }

  const [startAt, endAt] = str.split("_");

  if (startAt === "0" && endAt === "0") {
    return "신입";
  }

  if (startAt === "0" && endAt === "10") {
    return "경력무관";
  }

  return `${startAt}~${endAt}년`;
}

export function formatAddress(address: string) {
  const addressArr = address.split(" ");
  return `${addressArr[0]} ${addressArr[1]}`;
}
