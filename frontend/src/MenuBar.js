import React, {Component, useState} from 'react';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {isAuth} from './index';
import {Link, NavLink} from 'react-router-dom';

export default function MenuBar () {

    const [anchorEl, setAnchorEl] = useState();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return(
        <Box sx={{flexGrow:1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1, b: true, color: 'white'}} component={Link} InputProps={{disableUnderline: true}} to="/">
                        <b>Cookout</b>
                    </Typography>
                    {isAuth() ? (<Link to="/logout">Logout</Link>) : (<Link to="/login">Login</Link>)}
                        {/*<div>*/}
                        {/*    <IconButton size='large' color='inherit' aria-haspopup="true" onClick={handleMenu}>*/}
                        {/*        <Avatar/>*/}
                        {/*    </IconButton>*/}
                        {/*    <Menu id="menu-appbar" anchorEl={anchorEl}*/}
                        {/*    anchorOrigin={{vertical: 'top', horizontal: 'right',}}*/}
                        {/*    keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}}*/}
                        {/*    open={Boolean(anchorEl)} onClose={handleClose}*/}
                        {/*    >*/}
                        {/*        {isAuth() && (<MenuItem onClose={handleClose()}>*/}
                        {/*            <Link href="/login">Login</Link></MenuItem>)}*/}
                        {/*        {!isAuth() && (<MenuItem onClose={handleClose()}>*/}
                        {/*            <Link href="/logout">Logout</Link>*/}
                        {/*        </MenuItem>)}*/}
                        {/*    </Menu>*/}
                        {/*</div>*/}
                </Toolbar>
            </AppBar>
        </Box>
    )
}