import { useQuery } from "@tanstack/react-query";
import {
  D_dayOfWeek,
  D_enrollHireTerm,
  D_gender,
  D_oldList,
} from "data/my/hire/D_enrollHire";
import moment from "moment";
import { useLayoutEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, eps } from "utils/config";
import { formatWorkExperienceDuration } from "utils/formatJobPostData";

const limit = 10;

export function useJobPosts({
  order,
  jobType,
  regionCode,
  career,
  form,
}: {
  order: ISortKey;
  jobType?: string[];
  regionCode?: string[];
  career?: number[];
  form?: string;
}) {
  const [queryStringInstance] = useSearchParams();
  const [search, setSearch] = useState<string | null>();
  const [page, setPage] = useState<number>(-1);

  const searchParams = queryStringInstance.get("search");
  const pageParams = queryStringInstance.get("page");

  useLayoutEffect(() => {
    setSearch(searchParams);
    setPage(Number(pageParams ?? 1) - 1);
  }, [searchParams, pageParams]);

  const { data, ...rest } = useQuery(
    [
      "GET_JOB_POSTS_PAGINATION",
      page,
      search,
      order,
      jobType,
      regionCode,
      career,
      form,
    ],
    async () => {
      const { data } = await api.get(
        `${eps["GET_JOB_POSTS_PAGINATION"](
          page * limit,
          limit,
          order
        )}${getQueryStringWithoutNullable({
          searchkey: search,
          jobtypecode2: jobType,
          regioncode: regionCode,
          workexperienceduration: career?.join("_"),
          hiretypecode: form,
        })}`
      );

      if (data.list === null || data.status === "ERR") {
        throw new Error("invalid request");
      }

      return {
        list: data.list
          .filter((item: any) => !!item.iscomplete)
          .map((item: any) => {
            const {
              uuid,
              id,
              corpname,
              title,
              payamount,
              durationofhire,
              workdaysofweek,
              workhours,
              expiresat,
              gender,
              ages,
              workexperienceduration,
              note_,
              streetaddress,
              detailaddress,
              resthoursinminutes,
              employtype,
              jobtype,
              managername,
              phonenumber,
              paytype,
              payunit,
            } = item;

            return {
              id,
              uuid,
              corporationName: corpname,
              title,
              payAmount: payamount,
              payUnit: payunit,
              durationOfhire:
                D_enrollHireTerm[
                  durationofhire as keyof typeof D_enrollHireTerm
                ],
              workdaysOfweek: workdaysofweek
                ? JSON.parse(workdaysofweek).map(
                    (key: keyof typeof D_dayOfWeek) => D_dayOfWeek[key]
                  )
                : ["월"],
              workHours: workhours,
              expiresAt: moment(expiresat).format("YYYY.MM.DD"),
              gender: D_gender[gender as keyof typeof D_gender],
              ages: D_oldList[ages as keyof typeof D_oldList],
              workExperienceDuration: formatWorkExperienceDuration(
                workexperienceduration
              ),
              note: note_,
              streetAddress: streetaddress,
              detailAddress: detailaddress,
              restHoursInMinutes: resthoursinminutes,
              employType: employtype,
              jobType: jobtype,
              managerName: managername,
              phoneNumber: phonenumber,
              payType: paytype,
            };
          }),
        count: data.payload.count,
      } as {
        list: IJobPost[];
        count: number;
      };
    },
    { enabled: page > -1 }
  );

  const maxPage = useMemo(() => {
    const count = data?.count ?? limit * 5;
    return Math.ceil(count / limit);
  }, [data]);

  return { data: data!, ...rest, maxPage };
}

function getQueryStringWithoutNullable(object: Record<string, any>) {
  const paramsStr = Object.entries(object)
    .filter(([_, value]) => {
      const 값이_존재하는가 = !Array.isArray(value) && value != null;
      const 배열이면서_값이_존재하는가 = Array.isArray(value) && value[0];
      return 값이_존재하는가 || 배열이면서_값이_존재하는가;
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${JSON.stringify(value)}`;
      } else {
        return `${key}=${value}`;
      }
    })
    .join("&");
  return paramsStr ? `&${paramsStr}` : "";
}
