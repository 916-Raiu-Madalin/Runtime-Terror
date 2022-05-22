import {React, useState, useEffect} from "react"
import axios from "../api/axios"
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
  import DoneIcon from "@mui/icons-material/Done"


const Grade = () =>{
    const [rows, setRows] = useState([])
    const fetchData = (event) => {
        event?.preventDefault();
        let username = localStorage.getItem("user");
        let password = localStorage.getItem("password");
        axios({
          method: "GET",
          url: "/api/get_registrations/" + username,
          auth: {
            username: username,
            password: password,
          }
        })
          .then((response) => {
            setRows(response.data);
          })
          .catch((err) => {
            console.log(err);
          });}
          const useMountEffect = (fun) => useEffect(fun, [])
    useMountEffect(fetchData);

    const handleSubmit = (event ) =>{
        event?.preventDefault()
        const data = new FormData(event.currentTarget);
        axios({
            method: "POST",
            url: "/api/grade/" + data.get("courseId") + "/" + data.get("studentId") + "/" + data.get("grade"),
            auth: {
                username: localStorage.getItem('user'),
                password: localStorage.getItem('password')
            }
          })
          fetchData()

    }
    return(
        <div>
            {Object.keys(rows).map(row => (
                <TableContainer sx={{marginTop:4}}  component={Paper}>
                <Table
                  aria-label="Disciplines"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{ fontWeight: "bold" }}
                        align="center"
                      > {row}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Student name
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        Grade
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows[row].map((registration) => (
                      <TableRow
                        key={registration.studentId}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {registration.student.name}
                        </TableCell>
                        <TableCell align="right"><Box component="form" onSubmit={handleSubmit}>
                                    <TextField
                                    name="studentId"
                                    value={registration.studentId}
                                    sx={{display:'none'}}
                                    />
                                    <TextField
                                    name="courseId"
                                    value={registration.courseId}
                                    sx={{display:'none'}}
                                    />
                                <TextField
                                required
                                size="small"
                                id="grade"
                                label="Grade"
                                name="grade"
                                autoComplete="grade"
                                defaultValue={registration.grade}
                                autoFocus
                                />
                                <Button type="submit" variant="contained" endIcon={<DoneIcon/>} aria-label="Grade">Grade
                                </Button>
                                </Box></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </div>
    )
}

export default Grade