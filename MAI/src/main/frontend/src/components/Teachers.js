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


const Teachers = () =>{
    const [rows, setRows] = useState([])
    const fetchData = (event) => {
        event?.preventDefault();
        let username = localStorage.getItem("user");
        let password = localStorage.getItem("password");
        axios({
          method: "GET",
          url: "/api/get_disciplines_all/",
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
                        Discipline
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows[row].map((discipline) => (
                      <TableRow
                        key={discipline.name}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {discipline.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </div>
    )
}

export default Teachers