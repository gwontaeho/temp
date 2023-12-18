import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";

type SearchKeyword = {
  id: string;
  word: string;
};

export function useRecentSearchKeywords() {
  const user = useRecoilValue(userSelector);

  const { data, ...rest } = useQuery(
    ["GET_RECENT_SEARCH_KEYWORD", user],
    async () => {
      const { data } = await api.get(eps["GET_RECENT_SEARCH_KEYWORD"](0, 20));

      if (data.list === null || data.status === "ERR") {
        throw new Error("invalid request");
      }

      console.log(data.list);

      return data.list.map((item: any) => ({
        id: item.id,
        word: item.word,
      })) as SearchKeyword[];
    }
  );

  return { data: data!, ...rest };
}
