import {React} from "react"
import {Grid, Paper, Avatar, TextField, Button, Box, Container, FormControlLabel, Typography} from "@mui/material"


const Profile=()=>{
    const handleSubmit = (event) =>{
        
    }

    return(
        <Container component="main" maxWidth="xl">
            <Box onSubmit={handleSubmit} component="form">
                <TextField
                margin="normal"
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                />
                <TextField
                margin="normal"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                />
                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
                <TextField
                margin="normal"
                fullWidth
                id="cith"
                label="City"
                name="city"
                autoComplete="city"
                />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            >Save</Button>
            </Box>
        </Container>

    )
}

export default Profile