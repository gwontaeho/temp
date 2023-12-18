import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Layout from "components/Layout";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from "@mui/material";

const Page: NextPageWithLayout = () => {
    const test = [
        {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
        },
        {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
        },
    ];

    return (
        <Stack>
            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>헤드 1</TableCell>
                            <TableCell align="right">헤드2</TableCell>
                            <TableCell align="right">헤드3</TableCell>
                            <TableCell align="right">헤드4</TableCell>
                            <TableCell align="right">헤드5</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {test.map((v, i) => {
                            return (
                                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        바디 1
                                    </TableCell>
                                    <TableCell align="right">바디2</TableCell>
                                    <TableCell align="right">바디3</TableCell>
                                    <TableCell align="right">바디4</TableCell>
                                    <TableCell align="right">바디5</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
