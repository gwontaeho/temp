import { atom, selector } from "recoil";
import { api, eps } from "utils/config";

async function getHireData() {
  try {
    let { data : { list }} = await api.get(eps["GET_HIRE"]);
    return list
  } catch (err) {
    console.log(err);
  }
}

const hireAtom = atom<IcategoryList[] | null>({
  key: "hire",
  default: getHireData(),
});

export const hireSelector = selector<IcategoryList[] | null>({
  key: "hireSelector",
  get: async ({ get }) => {
    let hire = get(hireAtom);
    return hire ? hire : null
  },
  set: ({ set }, newValue) => {
    set(hireAtom, newValue);
  },
});
