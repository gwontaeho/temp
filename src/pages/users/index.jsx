import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Users = () => {
  const auth = useSelector((state) => state.auth);

  const [fetch, setFetch] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    setFetch(true);
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/user/admin", {
        headers: {
          token: auth.token,
        },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    fetch && (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>사용자 ID</TableCell>
                <TableCell align="right">별명</TableCell>
                <TableCell align="right">판매 중</TableCell>
                <TableCell align="right">판매 완료</TableCell>
                <TableCell align="right">구매</TableCell>
                <TableCell align="right">가입일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.nickname}</TableCell>
                  <TableCell align="right">{user.sale}</TableCell>
                  <TableCell align="right">{user.sold}</TableCell>
                  <TableCell align="right">{user.purchase}</TableCell>
                  <TableCell align="right">{user.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default Users;
