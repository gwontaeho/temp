import { useState } from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { hasCookie } from "cookies-next";
import { Search as SearchIcon } from "@mui/icons-material";

import { getManagers, updateManagerActivation } from "@/apis";
import { Header, Footer } from "@/components/common";
import { Nav } from "@/components/settings";

const Main = () => {
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);

    const { data, refetch } = useQuery({
        queryKey: ["managers", name],
        queryFn: () => getManagers({ name }),
    });

    const { mutate } = useMutation({
        mutationFn: (variables) => updateManagerActivation(variables),
        onSuccess: refetch,
    });

    const handleSearch = (e) => {
        if (e.code === "Enter") setName(keyword);
    };

    const handleClickMutate = (managerId, activation) => {
        mutate({ managerId, activation });
    };

    const managers = data?.response || [];
    const array = new Array(Math.ceil(managers.length / 10) || 1).fill(null).map((v, i) => {
        let slice = managers.slice(i * 10, (i + 1) * 10);
        if (slice.length < 10) slice = [...slice, ...new Array(10 - slice.length)];
        return slice;
    });

    const styles = {
        card: {
            bgcolor: "#fff",
            p: 5,
            borderRadius: 1.5,
            spacing: 3,
            border: "1px solid",
            borderColor: "spirokit.border",
            boxShadow: "0px 3px 6px #0000001A",
        },
    };

    return (
        <Stack component="main" bgcolor="spirokit.bg" p={3} spacing={1.5}>
            <Typography variant="h6" color="primary">
                의료진/검사자 관리
            </Typography>
            <Stack {...styles.card}>
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                    <TextField placeholder="이름" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleSearch} />
                    <Button onClick={() => setName(keyword)}>
                        <SearchIcon />
                    </Button>
                </Stack>
                <TableContainer sx={{ border: "1px solid", borderColor: "spirokit.border", borderRadius: 1.5 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width={250}>이름</TableCell>
                                <TableCell width={250}>등록일자</TableCell>
                                <TableCell width={250}>전화번호</TableCell>
                                <TableCell width={250}>직책</TableCell>
                                <TableCell width={100}>승인여부</TableCell>
                                <TableCell>승인관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array[page - 1]?.map((v, i) => {
                                const { id, name, createAt, tel, roleName, activation } = v || {};
                                const isGranted = activation === "GRANTED";
                                const isDenied = activation === "DENIED";
                                const a = isGranted ? "Y" : isDenied ? "N" : "";

                                return (
                                    <TableRow key={id || dayjs().valueOf() + i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{createAt}</TableCell>
                                        <TableCell>{tel}</TableCell>
                                        <TableCell>{roleName}</TableCell>
                                        <TableCell sx={{ color: isDenied ? "red" : "black" }}>{a}</TableCell>
                                        <TableCell height={70} padding="none">
                                            {!!v && (
                                                <Stack direction="row" spacing={1} justifyContent="center">
                                                    <Button onClick={() => handleClickMutate(id, "granted")} disabled={isGranted}>
                                                        승인
                                                    </Button>
                                                    <Button color="secondary" onClick={() => handleClickMutate(id, "denied")} disabled={isDenied}>
                                                        거부
                                                    </Button>
                                                </Stack>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination sx={{ alignSelf: "center" }} count={Math.ceil(managers.length / 10) || 1} page={page} onChange={(e, v) => setPage(v)} />
            </Stack>
        </Stack>
    );
};

export default function Settings() {
    return (
        <Stack minHeight="100vh" width={1920}>
            <Header />
            <Stack direction="row">
                <Nav />
                <Stack flex={1}>
                    <Main />
                    <Footer />
                </Stack>
            </Stack>
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const accessToken = hasCookie("accessToken", { req, res });

    if (!accessToken) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
