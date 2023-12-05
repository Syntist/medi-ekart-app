import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {authorize, getUsers, unauthorize } from "../../api/admin";
import { Button, Container } from "@mui/material";
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
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: "44px",
        paddingBottom: "44px"
      }}
    >
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          sx={{
            minWidth: 810
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Authorized</TableCell>
              <TableCell
                sx={{
                  width: "130px",
                  textAlign: "center"
                }}
              >
                Action
              </TableCell>
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
                  <TableCell
                    sx={{
                      width: "130px",
                      textAlign: "center"
                    }}
                  >
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
                        sx={{
                          fontSize: "12px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          minWidth: "123px"
                        }}
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
                        sx={{
                          fontSize: "12px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          minWidth: "123px"
                        }}
                      >
                        Deny access
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
