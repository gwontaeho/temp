import { useMutation } from "@tanstack/react-query";
import { api, eps } from "utils/config";

type CategoryCodeType = "jobtype2" | "corpname";
const SearchItemMap: Record<CategoryCodeType, string> = {
  jobtype2: "직종",
  corpname: "회사",
};

export function useSearch() {
  return useMutation(async (input: string) => {
    const { data } = await api.get(
      `${eps["GET_SEARCH"](5)}?searchkey=${input}`
    );

    if (data.list === null || data.status === "ERR") {
      throw new Error("invalid request");
    }

    return data.list.map((item: any) => ({
      ...item,
      category: SearchItemMap[item.category as CategoryCodeType],
    }));
  });
}
