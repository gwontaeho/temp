import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { getCookie } from "cookies-next";

import dayjs from "dayjs";

import { getRequests } from "@/apis";

export default function Requests() {
    const { data } = useQuery({
        queryKey: ["companies"],
        queryFn: getRequests,
    });
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
        {
            field: "phone",
            headerName: "연락처",
            width: 120,
            valueGetter: (params) => {
                const { phone, User } = params.row;
                return phone || User?.phone;
            },
        },
        {
            field: "createdAt",
            headerName: "요청일자",
            valueGetter: (params) => {
                const createdAt = params.row.createdAt;
                const str = dayjs(createdAt).isValid() ? dayjs(createdAt).format("YYYY.MM.DD HH:mm") : "-";
                return str;
            },
            width: 160,
        },
        {
            field: "share",
            headerName: "유형",
            width: 80,
            valueGetter: (params) => {
                const share = params.row.share;
                return share ? "공유" : "사용자";
            },
        },
        {
            field: "status",
            headerName: "상태",
            width: 80,
            valueGetter: (params) => {
                const { status, time, updatedAt } = params.row;
                const u = dayjs(updatedAt).add(time, "m").toDate();

                switch (status) {
                    case 0:
                        return "취소";
                    case 1:
                        return "요청중";
                    case 2:
                        return "대기중";
                    case 3:
                        if (u < dayjs()) return "완료";
                        return "이동중";
                    default:
                        return "완료";
                }
            },
        },

        {
            field: "address",
            headerName: "",
            width: 360,
            sortable: false,
            renderCell: ({ row }) => {
                const { address, address_detail, category, price, personnel, time } = row;
                return (
                    <Stack>
                        <Typography variant="body2">{`${category} · ${time}분 · ${personnel}명 · ${price}원`}</Typography>
                        <Typography variant="body2">{`${address} ${address_detail}`}</Typography>
                    </Stack>
                );
            },
        },
    ];

    if (!data) return null;

    const rows = (data || []).filter((v) => !v.phone?.startsWith("9999")).filter((v) => !v?.User?.phone?.startsWith("9999"));

    return (
        <Stack p={5} height={800} spacing={1}>
            {/* <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-end">
                <Stack direction="row" spacing={1}>
                    <Select
                        size="small"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setKeyword("");
                        }}
                    >
                        <MenuItem value="phone">연락처</MenuItem>
                        <MenuItem value="company_name">업체명</MenuItem>
                        <MenuItem value="expired">만료된 업체만</MenuItem>
                        <MenuItem value="marketing">마케팅 동의</MenuItem>
                    </Select>
                    {(search === "phone" || search === "company_name") && (
                        <TextField size="small" placeholder="검색" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    )}
                </Stack>
            </Stack> */}
            <DataGrid
                rows={data}
                getRowHeight={() => "auto"}
                sx={{
                    [`& .${gridClasses.cell}`]: {
                        py: 1,
                    },
                }}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                disableSelectionOnClick
            />
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const token = getCookie("token", { req, res });
    if (!token) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
