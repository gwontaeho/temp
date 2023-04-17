import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Stack, Button, Typography, TextField, Pagination } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { hasCookie } from "cookies-next";
import { Search as SearchIcon } from "@mui/icons-material";

import { Nav } from "@/components/settings";
import { Header, Footer } from "@/components/common";
import { getExaminees } from "@/apis";

const Main = () => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);

    const { data } = useQuery({
        queryKey: ["examinees", name],
        queryFn: () => getExaminees(name),
    });

    const handleSearch = (e) => {
        if (e.code === "Enter") setName(keyword);
    };

    const examinees = data?.response || [];

    const array = new Array(Math.ceil(examinees.length / 10) || 1).fill(null).map((v, i) => {
        let slice = examinees.slice(i * 10, (i + 1) * 10);
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
                피검사자 관리
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
                                <TableCell width={400}>차트넘버</TableCell>
                                <TableCell width={250}>이름</TableCell>
                                <TableCell width={250}>성별</TableCell>
                                <TableCell width={250}>생년월일</TableCell>
                                <TableCell>수정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array[page - 1]?.map((v, i) => {
                                const { id, birthday, chartNumber, gender, name } = v || {};

                                return (
                                    <TableRow key={id || dayjs().valueOf() + i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row" width={400} sx={{ maxWidth: 400 }}>
                                            {chartNumber}
                                        </TableCell>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{gender}</TableCell>
                                        <TableCell>{birthday}</TableCell>
                                        <TableCell height={70} padding="none">
                                            {!!v && <Button onClick={() => router.push(`/settings/examinees/update?id=${id}`)}>정보 수정</Button>}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination sx={{ alignSelf: "center" }} count={Math.ceil(examinees.length / 10) || 1} page={page} onChange={(e, v) => setPage(v)} />
            </Stack>
        </Stack>
    );
};

export default function Examinees() {
    return (
        <Stack minHeight="100vh" minWidth={1920}>
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
