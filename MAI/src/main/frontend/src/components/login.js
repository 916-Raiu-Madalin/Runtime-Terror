import {React, useContext, useTransition, useState} from "react"
import {Grid, Paper, Avatar, TextField, Button, Box, Container, FormControlLabel, Typography} from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/Lock'
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios"
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    const {setAuth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let username = data.get('username')
        let password = data.get('password')
        axios({
            method:'post',
            url:'/login',
            auth:{
                username:username,
                password:password
            },
            data:{
                username:username,
                password:password
            }
        }
        ).then(response =>{
            setErrMsg('');
            const role = response?.data;
            setAuth({username, role, "logged_in":true})
            localStorage.setItem('user', username)
            localStorage.setItem('role', role)
            navigate("/")

        }).catch(err =>{
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong username or password.');
            } else {
                setErrMsg('Login Failed');
            }
        })
        
    }

    return(
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="h1" variant="h5">
              {errMsg}
          </Typography>
          <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username   "
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    )
}



export default Login