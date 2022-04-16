import {React, useContext, useState} from "react"
import {AppBar, Box, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Tooltip, Avatar} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import{ Link as RouterLink, useLocation, useNavigate} from "react-router-dom"
import AuthContext from "../context/AuthProvider"



const Bar = () =>{
    const {auth, setAuth} = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const loggedIn = auth?.logged_in ? true : false
    const navigate = useNavigate();
    
    const pages = loggedIn? ["Home", auth?.role?.substring(5)] : ["Home"]
    const settings = ['Profile', 'Logout']
    const handleOpenNavMenu = (event) =>{
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout =()=>{
        setAuth({});
        navigate("/")

    }

    return (
        <AppBar position="static">
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                MAI: {useLocation().pathname}
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                MAI
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            {loggedIn &&(
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>
                        user
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <MenuItem key="profile" component={RouterLink} to="/profile" >
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key="logout" onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    
                </Menu>
              </Box>
              )}
            {!loggedIn &&(
                <Button component={RouterLink} onClick={handleCloseUserMenu} color="inherit" to="/login">Login</Button>
            )}
            </Toolbar>
          </Container>
        </AppBar>
    )

}
export default Bar