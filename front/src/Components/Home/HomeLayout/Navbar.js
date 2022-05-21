import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Navbar
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#4885ed' }} elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"

                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to="/" className='Nav-Item'>GYM</NavLink>
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

                            <MenuItem>
                                <NavLink to="/Supplements" onClick={handleCloseNavMenu} className='Nav-Item-SM'>Supplements</NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/Memberships" onClick={handleCloseNavMenu} className='Nav-Item-SM'>Memberships</NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/QueryForm" onClick={handleCloseNavMenu} className='Nav-Item-SM'>Query</NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to="/" className='Nav-Item'>GYM</NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button>
                            <NavLink to="/Memberships" style={({ isActive }) => { return { fontWeight: isActive ? 'bold' : '' } }} className='Nav-Item'>Memberships</NavLink>
                        </Button>
                        <Button>
                            <NavLink to="/Supplements" style={({ isActive }) => { return { fontWeight: isActive ? 'bold' : '' } }} className='Nav-Item'>Supplements</NavLink>
                        </Button>
                        <Button>
                            <NavLink to="/QueryForm" style={({ isActive }) => { return { fontWeight: isActive ? 'bold' : '' } }} className='Nav-Item'>Query</NavLink>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Login">
                            <MenuItem onClick={handleCloseNavMenu} >
                                <NavLink to="/Login" style={({ isActive }) => { return { fontWeight: isActive ? 'bold' : '' } }} className='Nav-Item'>Login</NavLink>
                            </MenuItem>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
