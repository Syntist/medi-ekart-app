import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {authorize, getUsers, unauthorize } from "../../api/admin";
import { Button } from "@mui/material";
import { ADMIN } from "../../constant";
import { toast } from "react-toastify";

export const Admin = () => {
  const [users, setUsers] = useState();
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [refetch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Authorized</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            ?.filter((user) => user.type !== ADMIN)
            .map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstName + " " + user.lastName}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.authorized ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {!user.authorized ? (
                    <Button
                      onClick={() =>
                        authorize(user.username).then(() => {
                          toast.success(`${user.username} Access Granted`);
                          setRefetch(!refetch);
                        })
                      }
                      color="primary"
                      variant="contained"
                    >
                      Grant Access
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        unauthorize(user.username).then(() => {
                          toast.success(`${user.username} Access Denied`);
                          setRefetch(!refetch);
                        })
                      }
                      color="error"
                      variant="contained"
                    >
                      Deny Access
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
