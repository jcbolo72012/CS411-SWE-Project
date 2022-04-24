import React, {Component} from 'react';
import {AppBar, Avatar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link, NavLink} from 'react-router-dom';

export default class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: props.isAuth
        }
    }

    render() {
        return(
            <Box sx={{flexGrow:1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" sx={{flexGrow: 1, b: true}}>
                            <b>Cookout</b>
                        </Typography>
                        {this.state.isAuth && (
                            <div>
                                <IconButton size='large' color='inherit'>
                                    <Avatar/>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        )

    }
}