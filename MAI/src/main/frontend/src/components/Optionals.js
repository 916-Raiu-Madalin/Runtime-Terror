import AuthContext from "../context/AuthProvider";
import { React, useContext, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "../api/axios";

const Optionals = () => {
  const [rows, setRows] = useState([]);
  const [pendingDisciplines, setPendingDisciplines] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const useMountEffect = (fun) => useEffect(fun, []);
  const handleSubmit = (event) => {
    event?.preventDefault();
    var Buffer = require("buffer/").Buffer;
    const data = new FormData(event.currentTarget);
    console.log(data.get("discipline"));
    data.set("teacher", localStorage.getItem("user"));
    axios({
      method: "post",
      url: "/api/add_optional",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            localStorage.getItem("user") +
              ":" +
              localStorage.getItem("password")
          ).toString("base64"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((response) => setErrMsg(response?.data))
      .catch((err) => console.log(err));
  };

  const fetchData = (event) => {
    event?.preventDefault();
    let username = localStorage.getItem("user");
    let password = localStorage.getItem("password");
    axios({
      method: "GET",
      url: "/api/get_optionals",
      auth: {
        username: username,
        password: password,
      },
      params: {
        teacher: username,
      },
    })
      .then((response) => {
        // rows=response.data;
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "GET",
      url: "/api/pending_disciplines/" + username,
      auth: {
        username: localStorage.getItem("user"),
        password: localStorage.getItem("password"),
      },
    })
      .then((response) => {
        console.log(response.data);
        setPendingDisciplines(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useMountEffect(fetchData);

  return (
    <Container component="main" maxWidth="xl">
      <Stack sx={{
        marginTop:4
      }} direction="row" spacing={2}>
        <TableContainer component={Paper}>
          <Table
            aria-label="Disciplines"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ fontWeight: "bold" }}
                  align="center"
                > Disciplines
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Discipline Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Number of ECTS Credits
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.noCredits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table aria-label="Pending Disciplines" title="Pending Disciplines">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ fontWeight: "bold" }}
                  align="center"
                >Pending Disciplines
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Discipline Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Number of ECTS Credits
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingDisciplines.map((discipline) => (
                <TableRow key={discipline.name}>
                  <TableCell>{discipline.name}</TableCell>
                  <TableCell align="right">{discipline.noCredits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Box  
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {errMsg}
        </Typography>
      </Box>
      <Paper>
      <Box onSubmit={handleSubmit} component="form"
        sx={{
          padding: 4,
        }}
      noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="discipline"
          label="Discipline Name"
          name="discipline"
          autoComplete="discipline"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="credits"
          label="Number of credits"
          name="credits"
          autoComplete="credits"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="semester"
          label="Semester"
          name="semester"
          autoComplete="semester"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="year"
          label="Year"
          name="year"
          autoComplete="semester"
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained">
          Save
        </Button>
      </Box>
      </Paper>
    </Container>
  );
};

export default Optionals;
