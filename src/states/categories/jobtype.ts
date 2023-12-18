import { atom, selector } from "recoil";
import { api, eps } from "utils/config";

async function getJobtypeData() {
  try {
    let { data : { list }} = await api.get(eps["GET_JOBTYPE"]);
    var region_list: any = [];
    var sub: any = [];

    list.map((e: any) => {
      if(e.level === 1){
        sub.reverse();
        e.subgroup = sub;
        region_list.push(e);
        sub = [];
      }
      else {
        sub.push(e);
      }
    })

    region_list.reverse();
    return region_list
  } catch (err) {
    console.log(err);
  }
}

const jobtypeAtom = atom<IcategoryList[] | null>({
  key: "jobtype",
  default: getJobtypeData(),
});

export const jobtypeSelector = selector<IcategoryList[] | null>({
  key: "jobtypeSelector",
  get: async ({ get }) => {
    let jobtype = get(jobtypeAtom);
    return jobtype ? jobtype : null
  },
  set: ({ set }, newValue) => {
    set(jobtypeAtom, newValue);
  },
});
