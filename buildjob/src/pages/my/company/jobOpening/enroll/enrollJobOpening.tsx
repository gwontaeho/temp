import DetailHeader from "components/header/detailHeader";
import CompanyInfo from "components/my/company/jobOpening/enroll/companyInfo";
import DefaultInfo from "components/my/company/jobOpening/enroll/defaultInfo";
import DetailContent from "components/my/company/jobOpening/enroll/detailContent";
import SupportCondition from "components/my/company/jobOpening/enroll/supportCondition";
import WorkCondition from "components/my/company/jobOpening/enroll/workCondition";

import { useState } from "react";

import { useLocation } from "react-router-dom";

export default function EnrollJobOpening() {
  const location = useLocation();
  const [jobUUID, setJobUUID] = useState<string>("");

  const [process, setProcess] = useState<number>(location.state?.process || 0);

  return (
    <>
      <DetailHeader title="공고 등록" bottomBorder />

      {process === 0 && (
        <DefaultInfo process={process} setProcess={setProcess} setUUID={setJobUUID} />
      )}
      {process === 20 && (
        <WorkCondition uuid={jobUUID} process={process} setProcess={setProcess} />
      )}
      {process === 50 && (
        <SupportCondition uuid={jobUUID} process={process} setProcess={setProcess} />
      )}
      {process === 75 && (
        <DetailContent uuid={jobUUID} process={process} setProcess={setProcess} />
      )}
      {process === 90 && (
        <CompanyInfo uuid={jobUUID} process={process} setProcess={setProcess} />
      )}
    </>
  );
}
