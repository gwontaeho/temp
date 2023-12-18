import { useMutation } from "@tanstack/react-query";
import { queryClient } from "providers/ReactQueryProvider";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";

export function useDeleteRecentSearchKeyword() {
  const user = useRecoilValue(userSelector);

  return useMutation(async (id: string) => {
    // TODO: delete recent search keyword api
    queryClient.setQueryData(
      ["GET_RECENT_SEARCH_KEYWORD", user],
      (old: any) => {
        return old.filter((item: any) => item.id !== id);
      }
    );
  });
}
