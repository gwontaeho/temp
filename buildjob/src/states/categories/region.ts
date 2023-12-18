import { atom, selector } from "recoil";
import { api, eps } from "utils/config";

async function getRegionData() {
  try {
    let { data : { list }} = await api.get(eps["GET_REGION"]);
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

const regionAtom = atom<IcategoryList[] | null>({
  key: "region",
  default: getRegionData(),
});

export const regionSelector = selector<IcategoryList[] | null>({
  key: "regionSelector",
  get: async ({ get }) => {
    let region = get(regionAtom);
    return region ? region : null
  },
  set: ({ set }, newValue) => {
    set(regionAtom, newValue);
  },
});
