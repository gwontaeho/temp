import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";

export function useFavorites() {
  const user = useRecoilValue(userSelector);

  const { data, ...rest } = useQuery(["GET_FAVORITES", user], async () => {
    const { data } = await api.get(
      `${eps["GET_FAVORITES"]}?srcfield=itemuuid&targetfield=uuid&targettable=jobposts`
    );
    return data.list
      .filter((item: any) => item.status === 1 && !!item.itemdetail)
      .map((item: any) => {
        return {
          uuid: item.itemuuid,
          companyName: item.itemdetail?.corpname,
          hireTitle: item.itemdetail?.title,
          date: moment(item.itemdetail?.createdat).format("MM/DD(ddd)"),
          loc: `${item.itemdetail?.streetaddress} ${item.itemdetail?.detailaddress}`,
          payType: `${item.itemdetail?.paytype}`,
          pay: `${item.itemdetail?.payamount}`,
        };
      }) as Iscrab[];
  });

  return { data: data!, ...rest };
}
