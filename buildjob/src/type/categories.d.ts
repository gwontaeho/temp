interface IcategoryList {
  codeint?: number;
  code: string;
  creatdat: string;
  group: string;
  name: string;
  id: number;
  level: number;
  subgroup?: IcategoryList[] | null;
  updatedat?: string | null;
}