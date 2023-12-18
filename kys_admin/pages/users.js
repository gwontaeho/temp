import { useState } from "react";
import { Stack, Typography, IconButton, Menu, MenuItem, Button, Select } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { getUsers, blockUser, restoreUser, deleteDevice } from "@/apis";

export default function Users() {
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("all");
    const [anchorEl, setAnchorEl] = useState(null);
    const [openId, setOpenId] = useState(null);

    const { data, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const { mutate: blockMutate } = useMutation({
        mutationFn: (variables) => blockUser(variables),
        onSuccess: refetch,
    });

    const { mutate: restoreMutate } = useMutation({
        mutationFn: (variables) => restoreUser(variables),
        onSuccess: refetch,
    });

    const { mutate: deleteDeviceMutate } = useMutation({
        mutationFn: (variables) => deleteDevice(variables),
        onSuccess: refetch,
    });

    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
        {
            field: "phone",
            headerName: "연락처",
            width: 120,
        },
        {
            field: "status",
            headerName: "상태",
            valueGetter: (params) => {
                const status = params.row.status;
                return status;
            },
            width: 90,
            renderCell: ({ value }) => {
                const statusStr = value === 1 ? "정상" : value === 0 ? "정지" : "대기";
                const color = value === 1 ? "green" : value === 0 ? "red" : "gray";
                return (
                    <Typography variant="body2" color={color}>
                        {statusStr}
                    </Typography>
                );
            },
        },
        {
            field: "last_login",
            headerName: "마지막 접속시간",
            valueGetter: (params) => {
                const last_login = params.row.last_login;
                const str = dayjs(last_login).isValid() ? dayjs(last_login).format("YYYY.MM.DD HH:mm") : "-";
                return str;
            },
            width: 120,
        },
        {
            field: "marketing",
            headerName: "마케팅",
            valueGetter: (params) => {
                const marketing = params.row.marketing;
                const str = marketing ? "동의" : "거부";
                return str;
            },
            width: 90,
        },
        {
            field: "more",
            headerName: "",
            width: 60,
            sortable: false,
            renderCell: ({ row }) => {
                const { id, status, Company } = row;

                const statusStr = status === 1 ? "계정 정지" : "계정 복구";

                const open = Boolean(anchorEl) && openId === id;

                const handleClick = (e) => {
                    setAnchorEl(e.currentTarget);
                    setOpenId(id);
                };
                const handleClose = () => {
                    setAnchorEl(null);
                    setOpenId(null);
                };

                const handleClickStatus = () => {
                    if (status === 1) blockMutate({ id });
                    else restoreMutate({ id });
                    setAnchorEl(null);
                };

                const handleClickReset = () => {
                    const result = confirm("사용자의 기기ID를 초기화합니다");
                    if (result) deleteDeviceMutate({ id });
                    setAnchorEl(null);
                };

                return (
                    <>
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        {status !== 2 && (
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={handleClickStatus}>{statusStr}</MenuItem>
                                <MenuItem onClick={handleClickReset}>기기ID 초기화</MenuItem>
                            </Menu>
                        )}
                    </>
                );
            },
        },
    ];

    const rows = data?.map((v) => {
        const { id, phone, status, last_login, marketing } = v;

        return { id, phone, status, last_login, marketing };
    });

    if (!rows) return null;

    const filtered = search === "marketing" ? rows.filter((v) => v.marketing) : rows;

    return (
        <Stack p={5} height={800} spacing={1}>
            <Stack direcroin="row" alignItems="flex-start">
                <Select
                    size="small"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                >
                    <MenuItem value="all">전체</MenuItem>
                    <MenuItem value="marketing">마케팅 동의</MenuItem>
                </Select>
            </Stack>
            <DataGrid
                rows={filtered}
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
