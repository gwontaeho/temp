export const step = 1;
export const min = 0;
export const max = 10;

export function getCareerStr(ranges: number[] | null): string | null {
  if (ranges === null) return null;

  let _str: string = "";
  if (ranges[0] <= min && ranges[1] >= max) _str = "전체";
  else {
    if (ranges[0] === 0) _str = "신입";
    else if (ranges[0] >= max) _str = `${max}년 이상`;
    else _str = `${ranges[0]}년`;

    if (ranges[0] === ranges[1]) return _str;

    if (ranges[1] >= max) _str = _str + ` - ${max}년 이상`;
    else _str = _str + ` - ${ranges[1]}년`;
  }

  return _str;
}
