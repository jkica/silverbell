import * as React from 'react';
import { useLocation } from "react-router-dom";

// components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//assets
import Logo from '../../assets/logo.svg';
import './style.css';
// import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import axios from "axios";
import {LogOutUrl} from "../../constants/endpoints";
import {useEffect} from "react";

export const Header = ({user}) => {
    const location = useLocation();

    useEffect(() => {
      user && console.log(user)  
    }, [user])
    const logOut = () => {
        axios.get(
            LogOutUrl(),
            {
                withCredentials: true
            })
            .then(res => {
                // createPost(res.data);
                // setToaster({
                //     visible: true,
                //     success: true,
                //     type: 'create',
                //     message: 'Logged Out'
                // });
            })
            .catch(err => {
                console.log(err)
                // setToaster({
                //     visible: true,
                //     success: false,
                //     type: 'create',
                //     message: err.response.data.msg
                // });
            })
    }
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar className="header-wrapper" disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        <img src={Logo} alt="logo"/>
                    </Typography>
                    <h1>Welcome {user && user.full_name.toUpperCase()}</h1>
                    {
                        location.pathname !== '/create' &&
                        <Button
                            onClick={logOut}
                            className="header-create-btn"
                            color="error"
                            size="large"
                            // endIcon={<AddCircleOutlineRoundedIcon />}
                            variant="contained">
                            log out
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}