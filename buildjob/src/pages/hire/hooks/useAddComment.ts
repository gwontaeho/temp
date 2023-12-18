import { useMutation } from "@tanstack/react-query";
import { useJobPost } from "hooks/useJobPost";
import { useUuid } from "hooks/useUuid";
import { queryClient } from "providers/ReactQueryProvider";
import { api, eps } from "utils/config";

export function useAddComment() {
  const uuid = useUuid();
  const {
    data: { id },
  } = useJobPost(uuid);

  return useMutation(
    async ({ inquiry, threadId }: { inquiry: string; threadId?: string }) => {
      await api.post(eps["POST_COMMENT"], {
        jobpostid: id,
        jobpostuuid: uuid,
        contents: inquiry,
        threadid: threadId ?? null,
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["GET_COMMENTS", uuid]);
      },
    }
  );
}
