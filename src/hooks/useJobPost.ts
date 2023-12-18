import { useQuery } from "@tanstack/react-query";
import {
  D_dayOfWeek,
  D_enrollHireTerm,
  D_gender,
  D_oldList,
} from "data/my/hire/D_enrollHire";
import moment from "moment";
import { api, eps } from "utils/config";
import { formatWorkExperienceDuration } from "utils/formatJobPostData";

export function useJobPost(uuid?: string) {
  const { data, ...rest } = useQuery(
    ["GET_JOB_DETAIL", uuid],
    async () => {
      const { data } = await api.get(eps["GET_JOB_DETAIL"](uuid!));

      const responseData = data.respdata;

      if (responseData === null || data.status === "ERR") {
        throw new Error("invalid request");
      }

      const {
        id,
        corpname,
        title,
        paytype,
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
        latitude,
        longitude,
        commutetype,
        commutetypecode,
        interviewtype,
        interviewtypecode,
        isagree,
        jobtypecode,
        jobtype2,
        jobtypecode2,
        payunit,
      } = responseData;

      return {
        id,
        uuid,
        corporationName: corpname,
        title,
        payType: paytype,
        payAmount: payamount,
        durationOfhire:
          D_enrollHireTerm[durationofhire as keyof typeof D_enrollHireTerm],
        durationOfhireCode: durationofhire,
        workdaysOfweek: workdaysofweek
          ? JSON.parse(workdaysofweek).map(
              (key: keyof typeof D_dayOfWeek) => D_dayOfWeek[key]
            )
          : null,
        workdaysOfweekCodes: JSON.parse(workdaysofweek ?? "[]"),
        workHours: workhours,
        expiresAt: moment(expiresat).format("YYYY.MM.DD"),
        gender: D_gender[gender as keyof typeof D_gender],
        genderCode: gender,
        ages: D_oldList[ages as keyof typeof D_oldList],
        agesCode: ages,
        workExperienceDuration: formatWorkExperienceDuration(
          workexperienceduration
        ),
        workExperienceDurationCode: workexperienceduration,
        workExperienceDurationValue: workexperienceduration,
        note: note_,
        streetAddress: streetaddress,
        detailAddress: detailaddress,
        restHoursInMinutes: resthoursinminutes,
        employType: employtype,
        jobType: jobtype,
        jobTypeCode: jobtypecode,
        jobType2: jobtype2,
        jobTypeCode2: jobtypecode2,
        managerName: managername,
        phoneNumber: phonenumber,
        latitude,
        longitude,
        commuteType: commutetype,
        commuteTypeCode: commutetypecode,
        interviewType: interviewtype,
        interviewTypeCode: interviewtypecode,
        isAgree: isagree === 1,
        payUnit: payunit,
      } as IJobPost;
    },
    { enabled: uuid != null }
  );

  return { data: data!, ...rest };
}
