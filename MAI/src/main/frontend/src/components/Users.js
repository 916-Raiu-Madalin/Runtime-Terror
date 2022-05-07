import {React, useContext, useTransition, useState} from "react"
import {Grid, Paper, Avatar, TextField, Button, Box, Container, FormControlLabel, Typography} from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/Lock'
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios"
import { useNavigate } from 'react-router-dom';
import {GET} from "../api/requests"

const Users =() => {
    const {auth, setAuth} = useContext(AuthContext);

    const fetchUsers = (event) =>{
        event.preventDefault();
        const loggedIn = auth?.logged_in ? true : false
        if(!loggedIn){
            console.log("THOU ARE NOT LOGGED IN");
            return
        }
        GET('/api/users').then(response=>{
            console.log(response)
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <Button onClick={fetchUsers}>
            CLICK ME
        </Button>
    )
}
export default Users