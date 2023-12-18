import { useQuery } from "@tanstack/react-query";
import ProfImg2 from "assets/images/example/hire/ProfImg2.png";
import { useUuid } from "hooks/useUuid";
import { api, eps } from "utils/config";

export function useComments() {
  const uuid = useUuid();

  const { data, ...rest } = useQuery(["GET_COMMENTS", uuid], async () => {
    const { data } = await api.get(eps["GET_COMMENTS"](uuid));

    const commentsMap: Record<string, IinquryList[]> = data.list.reduce(
      (acc: Record<string, IinquryList[]>, item: any) => {
        const convertedItem: IinquryList = {
          id: item.id.toString(),
          uid: item.uid.toString(),
          userUuid: item.useruuid,
          profImg: item.user.urlprofileimage ?? ProfImg2,
          nickname: item.user.username,
          content: item.contents,
          time: item.createdat,
          threadId: item.threadid,
        };

        if (!acc[convertedItem.threadId]) {
          return {
            ...acc,
            [convertedItem.threadId]: [convertedItem],
          };
        } else {
          return {
            ...acc,
            [convertedItem.threadId]: [
              ...acc[convertedItem.threadId],
              convertedItem,
            ],
          };
        }
      },
      {}
    );

    const comments: IinquryList[] = Object.keys(commentsMap)
      .map((key) => {
        const comments = commentsMap[key];
        comments.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        return {
          ...comments[0],
          reply: comments.slice(1),
        };
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return comments as IinquryList[];
  });

  return { data: data!, ...rest };
}
