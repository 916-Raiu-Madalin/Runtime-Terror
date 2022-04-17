import {
    Typography,
    Box,
    Button,
    CardContent,
    Card,
    CardActions,
    Avatar,
    Table,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material"
import {React,useState, useEffect} from "react"

import userLogo from "../userLogo.png"

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);



const Home = ( ) =>{
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    return(
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
        <Typography variant="h3">
            Welcome to MAI
        </Typography>
        <Card sx={{ minWidth: 500 ,width: '30%',display: 'flex', flexDirection: 'column'}}>
            <CardContent >
                <Box sx={{display: 'flex', flexDirection: 'row'}} color="text.secondary" gutterBottom>
                    <Typography sx={{fontSize:24}} gutterBottom>
                    Site News
                    </Typography>
                    <Typography sx={{width:'70%', textAlign:'right', marginLeft:'6%'}} >
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                            {' '}
                            {dateState.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                    </Typography>
                </Box>
                    <Table>
                        <TableBody>
                        <TableRow>
                            <TableCell ><Avatar alt="Remy Sharp" src={userLogo} />
                                <Typography sx={{color:'lightblue'}}>
                                    by Admin User
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5" component="div">
                                    Connection{bull}settings{bull}MAI{bull}

                                </Typography>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>


                <Typography variant="body2" sx={{paddingLeft:5}}>
                    <b>●The teachers assume their responsibilities for the students that enrol in their course</b>
                    <br />

                </Typography>
                <Typography variant="body2" sx={{paddingLeft:5}}>
                    <b>●The students can login using the username and password that they received on email</b>
                    <br />

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>

        </Card>

        </Box>

    )
}

export default Home;