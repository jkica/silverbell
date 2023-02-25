import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//assets
import Logo from '../../assets/logo.svg';
import './style.css';
import { LogOutUrl } from "../../constants/endpoints";

export const Header = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const logOut = () => {
        axios.get(
            LogOutUrl(),{withCredentials: true})
            .then(res => {
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar className="header-wrapper" disableGutters>
                    <Typography variant="h6" noWrap>
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
                            variant="contained">
                            log out
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}