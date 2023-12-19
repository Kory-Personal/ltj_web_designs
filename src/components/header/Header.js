import * as React from 'react';

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// Images
import Logo from "../../assets/images/LTJWebDesigns.png"

// Components
import BasicModal from '../modal/modal';

// React Imports
import { If, Then, Else } from 'react-if';


const pages = ['Services', 'About Me', 'Contact'];

export default function Header(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };



    return (
            <AppBar position="static" sx={{
                backgroundColor: "#000000"
            }} enableColorOnDark="true">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

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
                        horizontal: 'right',
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
                        <If condition={page === "Contact"}>
                            <Then>
                                <BasicModal orientation="mobile" handleCloseNavMenu={handleCloseNavMenu}/>
                            </Then>
                            <Else>
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            </Else>
                        </If>
                    
                    ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    fontFamily: 'monospace',
                    fontWeight: 300,
                    color: 'White',
                    textDecoration: 'none',
                    }}
                >
                    LTJ Web Designs
                </Typography>
                <img src={Logo} alt="logo" width={50} style={{padding: "1em"}}/>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <If condition={page === "Contact"}>
                            <Then>
                                <BasicModal />
                            </Then>
                            <Else>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.5em', paddingLeft: '2rem'}}
                                    color='success'
                                    >
                                    {page}
                                </Button>
                            </Else>
                        </If>
                    ))}
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
    )
}