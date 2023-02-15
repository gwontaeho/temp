import { useState } from "react";
import { Stack, Typography, IconButton, Menu, MenuItem, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { getCookie } from "cookies-next";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

import { getCompanies, blockUser, restoreUser, updateExpiration, updateCount, updateDistance, createCompany, updateName, deleteDevice } from "@/apis";

const CreateCompanyDialog = ({ refetch }) => {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [isErrored, setIsErrored] = useState(false);

    const { mutate } = useMutation({
        mutationFn: () => createCompany({ phone, name }),
        onSuccess: (data) => {
            if (data?.code === 1) setIsErrored(true);
            else {
                refetch();
                handleClose();
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
        setPhone("");
        setName("");
        setIsErrored(false);
    };

    const handleChangePhone = (e) => {
        if (isNaN(e.target.value)) return;
        setPhone(e.target.value);
    };

    const handleClickSubmit = () => {
        mutate();
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                업체추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>업체 추가</DialogTitle>
                <DialogContent>
                    <Stack spacing={1}>
                        <Typography>휴대폰 번호</Typography>
                        <TextField sx={{ width: 250 }} inputProps={{ maxLength: 11 }} value={phone} onChange={handleChangePhone} />
                        {isErrored && (
                            <Typography variant="body2" color="red">
                                이미 존재하는 업체입니다
                            </Typography>
                        )}
                        <Typography>업체명</Typography>
                        <TextField sx={{ width: 250 }} inputProps={{ maxLength: 20 }} value={name} onChange={(e) => setName(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleClickSubmit}>추가</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

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

const NameDialog = ({ Company, updateNameMutate }) => {
    const { id, name: originName, UserId } = Company;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(originName);

    const handleOpen = () => {
        setOpen(true);
        setName(originName);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSet = () => {
        updateNameMutate({ id, name, UserId });
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>업체명 설정</MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>업체명 설정</DialogTitle>
                <DialogContent>
                    <TextField value={name} sx={{ width: 250 }} inputProps={{ maxLength: 20 }} onChange={(e) => setName(e.target.value)} />
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [pageSize, setPageSize] = useState(5);

    const [search, setSearch] = useState("phone");
    const [keyword, setKeyword] = useState("");

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
    const { mutate: updateNameMutate } = useMutation({
        mutationFn: (variables) => updateName(variables),
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
            field: "company_name",
            headerName: "업체명",
            width: 150,
        },
        {
            field: "status",
            headerName: "상태",
            width: 60,

            valueGetter: (params) => {
                const status = params.row.status;
                return status;
            },

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
            valueGetter: (params) => {
                const max_count = params.row.Company?.max_count || 0;
                return max_count;
            },
        },
        {
            field: "distance",
            headerName: "거리",
            width: 60,
            valueGetter: (params) => {
                const distance = params.row.Company?.distance || 0;
                return distance;
            },
            renderCell: ({ row }) => {
                const distance = row.Company?.distance;
                const d = (distance / 1000).toFixed();
                return <Typography variant="body2">{d}km</Typography>;
            },
        },
        {
            field: "expiration",
            headerName: "만료일",
            width: 180,
            valueGetter: (params) => {
                const { expiration } = params.row.Company || {};
                return expiration;
            },
            sortComparator: (v1, v2) => v1 - v2,
            renderCell: ({ row }) => {
                const { id, expiration } = row.Company || {};

                const diff = dayjs(expiration).diff(dayjs(dayjs().format("YYYYMMDD")), "days");

                const color = diff >= 0 ? "green" : "gray";
                const sign = diff >= 0 ? "+" : "";

                const rest = `(${sign}${diff})`;

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
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {InputProps?.endAdornment}
                                    <Typography ref={inputRef} variant="body2" color={color}>
                                        {expiration ? `${dayjs(value).format("YYYY. MM. DD")}` : "미설정"}
                                    </Typography>
                                    {!!expiration && (
                                        <Typography color={color} variant="body2">
                                            {rest}
                                        </Typography>
                                    )}
                                </Stack>
                            );
                        }}
                    />
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
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <DistanceDialog Company={Company} updateDistanceMutate={updateDistanceMutate} />
                            <CallDialog Company={Company} updateCountMutate={updateCountMutate} />
                            <NameDialog Company={Company} updateNameMutate={updateNameMutate} />
                            <MenuItem onClick={handleClickStatus}>{statusStr}</MenuItem>
                            <MenuItem onClick={handleClickReset}>기기ID 초기화</MenuItem>
                        </Menu>
                    </>
                );
            },
        },
    ];

    if (!data) return null;

    const rows = keyword
        ? data.filter((v) => v[search].includes(keyword))
        : search === "expired"
        ? data.filter((v) => !v.Company?.expiration || dayjs(v.Company?.expiration) < dayjs(dayjs().format("YYYYMMDD")))
        : data;

    return (
        <Stack p={5} height={800} width="100%" spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-end">
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
                    </Select>
                    {search !== "expired" && <TextField size="small" placeholder="검색" value={keyword} onChange={(e) => setKeyword(e.target.value)} />}
                </Stack>
                <CreateCompanyDialog refetch={refetch} />
            </Stack>
            <DataGrid
                rows={rows}
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
