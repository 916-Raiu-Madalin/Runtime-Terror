import { Typography, Box } from "@mui/material"
import {React} from "react"




const Home = ( ) =>{

    return(
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography variant="h3">
            Welcome to MAI
        </Typography>
        </Box>
    )
}

export default Home;