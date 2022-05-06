import AuthContext from "../context/AuthProvider"

import {React, useContext, useEffect, useState} from "react"
import {Grid, Paper, Avatar, TextField, Button, Box, Container, FormControlLabel, Typography} from "@mui/material"
import {POST} from "../api/requests"
import axios from "../api/axios"


const Profile=()=>{
    const {auth, setAuth} = useContext(AuthContext);
    const useMountEffect = (fun) => useEffect(fun, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [city, setCity] = useState('')
    
    const fetchData = (event) =>{
        event?.preventDefault();
        const loggedIn = auth?.logged_in ? true : false
        // if(!loggedIn){
        //     console.log("THOU ARE NOT LOGGED IN");
        //     return
        // }
        let username = localStorage.getItem('user');
        let password = localStorage.getItem('password');
        console.log(username, password)
        axios({
            method:'GET',
            url:'/api/profile',
            auth:{
                username:username,
                password:password
            },
            params:{
                username:username
            }
        }).then(response =>{
            console.log(response)
            setFirstName(response?.firstName)
            setLastName(response?.lastName)
            setEmailAddress(response?.emailAddress)
            setCity(response?.city)

        }).catch(err=>{
            console.log(err)
        })
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        console.log(data.get('firstname'), data.get('lastname'))
        // POST('/api/profile', data).then(response=>
        //     console.log(response?.data))
        // .catch(err=>
        //     console.log(err))
        
    }
    useMountEffect(fetchData);

    return(
        <Container component="main" maxWidth="xl">
            <Box onSubmit={handleSubmit} component="form" noValidate>
                <TextField
                margin="normal"
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                defaultValue={firstName || ""}
                autoComplete="firstname"
                autoFocus
                />
                <TextField
                margin="normal"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                defaultValue={lastName || ""}
                autoComplete="lastname"
                />
                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={emailAddress || ""}
                autoComplete="email"
                />
                <TextField
                margin="normal"
                fullWidth
                id="cith"
                label="City"
                name="city"
                defaultValue={city || ""}
                autoComplete="city"
                />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            >Save</Button>
            </Box>
            <Button onClick={fetchData} variant="contained">CLCIK ME</Button>
        </Container>

    )
}

export default Profile