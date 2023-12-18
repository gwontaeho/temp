import { useQuery } from "@tanstack/react-query";
import { api, eps } from "utils/config";

type SearchKeyword = {
  id: string;
  word: string;
};

export function usePopularSearchKeywords() {
  const { data, ...rest } = useQuery([], async () => {
    const { data } = await api.get(eps["GET_POPULAR_SEARCH_KEYWORDS"](0, 20));

    if (data.list === null || data.status === "ERR") {
      throw new Error("invalid request");
    }

    return data.list.map((item: any) => ({
      id: item.id,
      word: item.word,
    })) as SearchKeyword[];
  });

  return { data: data!, ...rest };
}
