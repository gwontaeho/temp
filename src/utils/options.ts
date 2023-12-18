export function getOptionsFromObject(obj: Record<string, any>): IOption[] {
  return Object.keys(obj).map((key) => ({ value: key, label: obj[key] }));
}

export function getOptionsFromArray(arr: any[]): IOption[] {
  return arr.map((item) => ({ value: item, label: item }));
}
