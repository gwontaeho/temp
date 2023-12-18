import { useMutation } from "@tanstack/react-query";
import { queryClient } from "providers/ReactQueryProvider";
import { toast } from "react-toastify";
import { api, eps } from "utils/config";

export function useSaveFavorite() {
  return useMutation(async (uuid?: string) => {
    if (!uuid) return;
    const { data } = await api.put(eps["PUT_FAVORITE"], {
      key: {
        itemuuid: uuid,
      },
      targetcolumnname: "status",
    });

    const result = data.respdata?.status === 1;

    if (result) {
      toast("스크랩에 저장되었습니다.");
    } else {
      toast("스크랩에서 삭제되었습니다.");
    }
    await queryClient.setQueryData(["GET_FAVORITE", uuid], result);

    return result;
  });
}
