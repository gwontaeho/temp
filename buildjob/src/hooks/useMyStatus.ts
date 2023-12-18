import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";

export function useMyStatus() {
  const user = useRecoilValue(userSelector);

  const { data, ...rest } = useQuery(["USERSTATUS", user], async () => {
    let { data } = await api.get(eps["USERSTATUS"]);
    return data;
  });

  return { data: data!, ...rest };
}
