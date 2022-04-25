import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import { useCallback, useEffect, useState } from "react";

export const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios
            .get(
                `/api/restaurants?page=${page}&size=${rowsPerPage}&sort=id,DESC`
            )
            .then((response) => setRows(response.data.information.content))
            .catch((error) => console.log(error));
    }, [page, rowsPerPage]);

    const handleChangeRowsPerPage = useCallback((e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">category</TableCell>
                        <TableCell align="right">address</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">
                                <Link to={`/restaurant/${row.id}`}>edit</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={13}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
