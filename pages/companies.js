import { useState } from "react";
import { Stack, Typography, IconButton, Menu, MenuItem, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { getCookie } from "cookies-next";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

import { getCompanies, blockUser, restoreUser, updateExpiration, updateCount, updateDistance } from "@/apis";

const CallDialog = ({ Company, updateCountMutate }) => {
    const { id, max_count } = Company;
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(max_count);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCount(max_count);
    };

    const handleClickSet = () => {
        updateCountMutate({ id, max_count: count });
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>콜 설정</MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>콜 설정</DialogTitle>
                <DialogContent>
                    <TextField value={count} inputProps={{ maxLength: 2 }} onChange={(e) => !isNaN(e.target.value) && setCount(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleClickSet}>설정</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const DistanceDialog = ({ Company, updateDistanceMutate }) => {
    const { id, distance } = Company;
    const [open, setOpen] = useState(false);
    const [newDistance, setNewDistance] = useState(distance / 1000);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewDistance(distance / 1000);
    };

    const handleClickSet = () => {
        updateDistanceMutate({ id, distance: newDistance * 1000 });
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>거리 설정</MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>거리 설정</DialogTitle>
                <DialogContent>
                    <TextField value={newDistance} inputProps={{ maxLength: 3 }} onChange={(e) => !isNaN(e.target.value) && setNewDistance(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleClickSet}>설정</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default function Companies() {
    const { data, refetch } = useQuery({
        queryKey: ["companies"],
        queryFn: getCompanies,
    });

    const { mutate: blockMutate } = useMutation({
        mutationFn: (variables) => blockUser(variables),
        onSuccess: refetch,
    });

    const { mutate: restoreMutate } = useMutation({
        mutationFn: (variables) => restoreUser(variables),
        onSuccess: refetch,
    });

    const { mutate: updateExpirationMutate } = useMutation({
        mutationFn: (variables) => updateExpiration(variables),
        onSuccess: refetch,
    });

    const { mutate: updateCountMutate } = useMutation({
        mutationFn: (variables) => updateCount(variables),
        onSuccess: refetch,
    });

    const { mutate: updateDistanceMutate } = useMutation({
        mutationFn: (variables) => updateDistance(variables),
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
            field: "company_name",
            headerName: "업체명",
            width: 120,
        },
        {
            field: "status",
            headerName: "상태",
            width: 90,
            renderCell: ({ value }) => {
                const statusStr = value === 1 ? "정상" : "정지";
                const color = value === 1 ? "green" : "red";
                return (
                    <Typography variant="body2" color={color}>
                        {statusStr}
                    </Typography>
                );
            },
        },
        {
            field: "count",
            headerName: "콜",
            width: 60,
            renderCell: ({ row }) => {
                const max_count = row.Company.max_count;
                return <Typography variant="body2">{max_count}</Typography>;
            },
        },
        {
            field: "distance",
            headerName: "거리",
            width: 90,
            renderCell: ({ row }) => {
                const distance = row.Company.distance;
                const d = (distance / 1000).toFixed();
                return <Typography variant="body2">{d}km</Typography>;
            },
        },
        {
            field: "expiration",
            headerName: "만료일",
            width: 150,
            renderCell: ({ row }) => {
                const { id, expiration } = row.Company;

                const diff = dayjs(expiration).diff(dayjs(dayjs().format("YYYYMMDD")), "days");
                const color = diff >= 0 ? "green" : "gray";

                return (
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={expiration}
                        onChange={(v) => updateExpirationMutate({ id, expiration: v.format("YYYYMMDD") })}
                        renderInput={(params) => {
                            const { inputRef, inputProps, InputProps } = params;
                            const value = inputProps.value || "00000000";

                            return (
                                <Stack direction="row" alignItems="center">
                                    <Typography ref={inputRef} variant="body2" color={color}>
                                        {dayjs(value).format("YYYY. MM. DD")}
                                    </Typography>
                                    {InputProps?.endAdornment}
                                </Stack>
                            );
                        }}
                    />
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
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <DistanceDialog Company={Company} updateDistanceMutate={updateDistanceMutate} />
                            <CallDialog Company={Company} updateCountMutate={updateCountMutate} />
                            <MenuItem onClick={handleClickStatus}>{statusStr}</MenuItem>
                        </Menu>
                    </>
                );
            },
        },
    ];

    if (!data) return null;

    return (
        <Stack p={5} height={800} width="100%">
            <DataGrid rows={data} columns={columns} pageSize={10} disableSelectionOnClick />
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
