import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, Button, Typography, Divider, TextField, List, ListItem, ListItemButton, Modal, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { persistor } from "@/redux/store";
import { setAuth } from "@/redux/authSlice";
import { getExaminees, getManagers } from "@/apis";
import { Examinee, Dates } from "@/components/index";
import { setExamineeId } from "@/redux/mainSlice";

export const Nav = () => {
    const dispatch = useDispatch();
    const { auth, main } = useSelector((state) => state);

    const loginId = auth?.loginId;
    const examineeId = main?.examineeId;

    const router = useRouter();

    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ["examinees", name],
        queryFn: () => getExaminees(name),
    });

    const {} = useQuery({
        queryKey: ["managers", loginId],
        queryFn: () => getManagers({ loginId }),
        enabled: !!loginId,
        onSuccess: (data) => {
            const { name } = data?.response?.[0];
            dispatch(setAuth({ name }));
        },
    });

    const handleSearch = (e) => {
        if (e.code === "Enter") setName(keyword);
    };

    const handleClickLogout = () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        persistor.purge();
        router.push("/signin");
    };

    const examinees = data?.response || [];

    return (
        <Stack component="nav" width={320} minWidth={320} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{auth.name}</Typography>
                <Button size="small" variant="text" onClick={handleClickLogout}>
                    로그아웃
                </Button>
            </Stack>
            <Divider sx={{ bgcolor: "primary.bg" }} />
            <Stack>
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "primary.main" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                        },
                    }}
                    placeholder="피검사자 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleSearch}
                    onClick={() => setOpen(true)}
                    InputProps={{
                        style: {
                            padding: 0,
                            boxShadow: "0px 3px 6px #0000001A",
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setName(keyword)} color="primary">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack position="relative">
                    <Modal
                        disableAutoFocus
                        slotProps={{ backdrop: { sx: { bgcolor: "transparent" } } }}
                        open={name !== null && open}
                        onClose={() => setOpen(false)}
                        disablePortal
                        sx={{ position: "absolute" }}
                    >
                        <List
                            sx={{
                                p: 0,
                                mt: 1,
                                bgcolor: "#fff",
                                boxShadow: "0px 3px 6px #0000001A",
                                borderRadius: 1.5,
                                border: "1px solid",
                                borderColor: "spirokit.border",
                                maxHeight: 480,
                                overflowY: "auto",
                            }}
                        >
                            <ListItem sx={{ bgcolor: "spirokit.bg" }}>
                                <Typography variant="body2">{!!name ? `"${name}" 검색결과` : "전체 검색결과"}</Typography>
                            </ListItem>
                            {examinees.map((examinee) => {
                                const { id, chartNumber, birthday, name, gender } = examinee;
                                return (
                                    <ListItem disablePadding key={id}>
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch(setExamineeId({ examineeId: id, examineeName: name }));
                                                setOpen(false);
                                            }}
                                            selected={examineeId === id}
                                        >
                                            <Stack sx={{ overflow: "hidden" }} spacing={0.5}>
                                                <Typography variant="body2">{`${name} ${birthday} (${gender})`}</Typography>
                                                <Typography variant="caption" color="graytext">
                                                    {chartNumber}
                                                </Typography>
                                            </Stack>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Modal>
                </Stack>
            </Stack>

            <Examinee />
            <Dates />
        </Stack>
    );
};
