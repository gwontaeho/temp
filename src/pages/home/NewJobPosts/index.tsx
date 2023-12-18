import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { api, eps } from "utils/config";
import AnnounceListComponent from "../shared/AnnounceList";

export function NewJobPosts() {
  return (
    <Suspense>
      <Resolved />
    </Suspense>
  );
}

function Resolved() {
  const { data: newJobPosts } = useNewJobPosts();
  return (
    <AnnounceListComponent
      title="신규 채용정보"
      list={newJobPosts}
      marginTop={24}
    />
  );
}

function useNewJobPosts() {
  const { data, ...rest } = useQuery(["GET_NEW_JOB_POSTS"], async () => {
    const { data } = await api.get(eps["GET_NEW_JOB_POSTS"](0, 24));

    return data.list.map((item: any) => ({
      uuid: item.uuid,
      company: item.corpname,
      title: item.title,
      pay: `${item.payamount}${item.payunit}`,
      payType: item.paytype,
      loc: `${item.streetaddress} ${item.detailaddress}`,
      fav: false,
    })) as IannounceList[];
  });

  return { data: data!, ...rest };
}
