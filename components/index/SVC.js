import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIds } from "@/redux/mainSlice";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { getSimpleResult, getConformity, getDetailResult, getReport } from "@/apis";
import pdf from "@/public/pdf.svg";
import jpg from "@/public/jpg.svg";
import { SVCGraph } from "./SVCGraph";
import { SVCDetail } from "./SVCDetail";
import { Report, Dialog } from "../common";

export const SVC = () => {
    const dispatch = useDispatch();
    const type = "SVC";
    const { examineeId, examineeName, date } = useSelector((state) => state.main);
    const [open, setOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ["simple", type, examineeId, date],
        queryFn: () => getSimpleResult({ examineeId, type, date }),
        enabled: !!examineeId && !!date,
        onSuccess: ({ response }) => dispatch(setSelectedIds({ selectedIds: response.map((v) => v.measurementId), type })),
    });

    const simple = (data?.response || []).sort((a, b) => dayjs(b.date) - dayjs(a.date));
    const measurementIds = simple.map((v) => v.measurementId);

    const { data: cData } = useQuery({
        queryKey: ["conformity", type, examineeId, measurementIds],
        queryFn: () => getConformity({ examineeId, type, measurementIds }),
        enabled: !!examineeId && !!measurementIds.length,
    });

    const c = cData?.response;
    const postId = c?.postId;
    const preId = c?.preId;

    const { data: detaulResultData } = useQuery({
        queryKey: ["detailResult", type, examineeId],
        queryFn: () => getDetailResult({ examineeId, type, date, measurementIds: [postId, preId].filter(Boolean) }),
        enabled: !!examineeId && !!date && !!cData,
    });

    // 결과지
    const { data: rData, isError } = useQuery({
        queryKey: ["report", type, examineeId, date],
        queryFn: () => getReport({ examineeId, type, date }),
        enabled: !!examineeId && !!date,
    });

    console.log("svc", rData);

    const report = rData?.response || {};
    const reportCode = rData?.status;
    const reportTitle = `${examineeName}${dayjs().format("YYYYMMDD_HHmmss")}`;
    const dialogText =
        reportCode === 204 ? (
            <>
                Pre 검사 결과가 1개 이상 있어야 합니다. <br />
                검사 후 다시 시도해주세요.
            </>
        ) : (
            "검사 결과가 없어 파일을 저장 할 수 없습니다."
        );

    const pre = (detaulResultData?.response || []).find((v) => v.medicationState === "PRE")?.results || [];
    const post = (detaulResultData?.response || []).find((v) => v.medicationState === "POST")?.results || [];

    const handleClickJpg = async () => {
        try {
            const report = document.querySelector(`#report-${type}`);
            if (reportCode === 204 || isError || !report) throw Error;
            const canvas = await html2canvas(report, { scale: 3 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            let link = document.createElement("a");
            link.href = uri;
            link.download = `${reportTitle}.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setOpen(true);
        }
    };

    const handleClickPdf = async () => {
        try {
            const report = document.querySelector(`#report-${type}`);
            if (reportCode === 204 || isError || !report) throw Error;
            const canvas = await html2canvas(report, { scale: 3 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(uri, "JPEG", 0, 0, pageWidth, pageHeight);
            doc.save(`${reportTitle}.pdf`);
        } catch (error) {
            setOpen(true);
        }
    };

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" color="primary">
                        SVC
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: "pointer" }} onClick={handleClickPdf}>
                            <Image priority src={pdf} alt="pdf" width={15} height={15} />
                            <Typography variant="body2" color="#8C1A11">
                                PDF 다운로드
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: "pointer" }} onClick={handleClickJpg}>
                            <Image priority src={jpg} alt="pdf" width={18} height={19} />
                            <Typography variant="body2" color="#8C1A11">
                                JPG 다운로드
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <SVCGraph />
                <SVCDetail simple={simple} pre={pre} post={post} />
            </Stack>
            {!!rData && <Report data={report} type="SVC" />}
            <Dialog open={open} setOpen={setOpen} content={dialogText} cancel="확인" />
        </>
    );
};
