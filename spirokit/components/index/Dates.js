import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography, List, ListItem, ListItemButton, IconButton, Dialog, TextField, Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { TodayOutlined as TodayOutlinedIcon, Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";
import logo from "@/public/logo.svg";

import { getDates } from "@/apis";
import { setDate } from "@/redux/mainSlice";

const DateDialog = ({ fromTo, setFromTo }) => {
    const pickers = ["from", "to"];
    const [open, setOpen] = useState(false);
    const [openPicker, setOpenPicker] = useState({ from: false, to: false });
    const [newFromTo, setNewFromTo] = useState({ from: fromTo.from, to: fromTo.to });

    const handleOpenDialog = () => {
        setNewFromTo({ from: fromTo.from, to: fromTo.to });
        setOpen(true);
    };

    const handleOpen = (target) => {
        setOpenPicker((prev) => ({ ...prev, [target]: true }));
    };

    const handleClose = () => {
        setOpenPicker({ from: false, to: false });
    };

    const handleChange = (newValue, target) => {
        if (target === "from") if (newValue > newFromTo.to) return setNewFromTo((prev) => ({ ...prev, [target]: newValue, to: newValue }));
        if (target === "to") if (newValue < newFromTo.from) return setNewFromTo((prev) => ({ ...prev, [target]: newValue, from: newValue }));
        setNewFromTo((prev) => ({ ...prev, [target]: newValue }));
    };

    const handleSubmit = () => {
        setFromTo(newFromTo);
        setOpen(false);
    };

    return (
        <>
            <IconButton color="primary" sx={{ p: 0 }} onClick={handleOpenDialog}>
                <TodayOutlinedIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={5}>
                    <Image priority src={logo} alt="logo" width={160} />

                    <Stack direction="row" spacing={3}>
                        {pickers.map((v) => {
                            const label = v === "from" ? "시작 일시" : "종료 일시";
                            return (
                                <Stack key={v} flex={1} spacing={1}>
                                    <Typography variant="body2">{label}</Typography>
                                    <DesktopDatePicker
                                        open={openPicker[v]}
                                        onClose={handleClose}
                                        inputFormat="YYYY.MM.DD"
                                        value={newFromTo[v]}
                                        onChange={(newValue) => handleChange(newValue, v)}
                                        renderInput={({ inputProps, inputRef }) => {
                                            const props = {
                                                inputRef,
                                                inputProps: {
                                                    ...inputProps,
                                                    readOnly: true,
                                                    placeholder: "0000.00.00",
                                                    sx: { textAlign: "center", cursor: "pointer" },
                                                },
                                            };
                                            return <TextField {...props} onClick={() => handleOpen(v)} />;
                                        }}
                                    />
                                </Stack>
                            );
                        })}
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Button color="secondary" onClick={() => setOpen(false)} sx={{ flex: 1 }}>
                            취소
                        </Button>
                        <Button onClick={handleSubmit} sx={{ flex: 1 }}>
                            확인
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const Dates = () => {
    const dispatch = useDispatch();

    const main = useSelector((state) => state.main);
    const { examineeId, date } = main;

    const [fromTo, setFromTo] = useState({ from: null, to: null });
    const from = fromTo.from ? dayjs(fromTo.from).format("YYYY-MM-DD") : "";
    const to = fromTo.to ? dayjs(fromTo.to).format("YYYY-MM-DD") : "";

    const { data, isFetching } = useQuery({
        queryKey: ["dates", examineeId, fromTo],
        queryFn: () => getDates({ examineeId, from, to }),
        enabled: !!examineeId,
    });

    const dates = data?.response || [];

    return (
        <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">날짜별 검사 이력</Typography>
                <DateDialog fromTo={fromTo} setFromTo={setFromTo} />
            </Stack>
            <List
                sx={{
                    p: 0,
                    bgcolor: "#fff",
                    boxShadow: "0px 3px 6px #0000001A",
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: "spirokit.border",
                    maxHeight: 400,
                    height: 400,
                    overflow: "auto",
                }}
            >
                <ListItem sx={{ bgcolor: "spirokit.bg", justifyContent: "center" }}>
                    <Typography variant="body2">검사일</Typography>
                </ListItem>
                {dates.length === 0 && !isFetching && (
                    <Typography variant="body2" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%)" }}>
                        검색된 이력이 없습니다
                    </Typography>
                )}
                {dates.map((v) => {
                    return (
                        <ListItem disablePadding key={v}>
                            <ListItemButton onClick={() => dispatch(setDate({ date: v }))} selected={date === v} sx={{ justifyContent: "center" }}>
                                <Typography variant="body2">{v}</Typography>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Stack>
    );
};
