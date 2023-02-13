import { useState } from "react";
import { Stack, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import { getUsers, blockUser, restoreUser } from "@/apis";

export default function Users() {
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

    const columns = [
        { field: "id", headerName: "ID", width: 90, hide: true },
        {
            field: "phone",
            headerName: "연락처",
            width: 150,
        },
        {
            field: "status",
            headerName: "상태",
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
            field: "more",
            headerName: "",
            width: 60,
            renderCell: ({ row }) => {
                const { id, status, Company } = row;

                const statusStr = status === 1 ? "계정 정지" : "계정 복구";

                const [anchorEl, setAnchorEl] = useState(null);
                const open = Boolean(anchorEl);

                const handleClick = (e) => {
                    setAnchorEl(e.currentTarget);
                };
                const handleClose = () => {
                    setAnchorEl(null);
                };

                const handleClickStatus = () => {
                    if (status === 1) blockMutate({ id });
                    else restoreMutate({ id });
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
                            </Menu>
                        )}
                    </>
                );
            },
        },
    ];

    const rows = data?.map((v) => {
        const { id, phone, status } = v;

        return { id, phone, status };
    });

    if (!rows) return null;

    return (
        <Stack p={5} height={800} width={1000}>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick />
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
