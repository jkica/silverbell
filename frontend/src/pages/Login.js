import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LogInUrl } from "../constants/endpoints";
import axios from "axios";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Alert, Snackbar, TextField } from "@mui/material";

export const Login = () => {
    const navigate = useNavigate();
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // TODO@jkica: make toaster global
    const [toaster, setToaster] = useState({
        visible: false,
        success: false,
        message: ''
    });

    const handleFieldChange = (field, value) => {
        setInputValuesChanged(true)
        setFormData(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        })
    }
    const logIn = () => {
        axios.post(
            LogInUrl(),
            formData,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                withCredentials: true
            })
            .then(res => {
                setToaster({
                    visible: true,
                    success: true,
                    message: 'Logged In'
                });
            })
            .catch(err => {
                console.log(err)
                setToaster({
                    visible: true,
                    success: false,
                    message: err.response.data.msg
                });
            })
    }

    const onToasterClose = () => {
        setToaster(prevState => {
            return {
                ...prevState,
                visible: false
            }
        });

        toaster.success && navigate('/');
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Paper className="edit-modal" elevation={3}>
                    <div className="edit-modal-header">
                        <div className="edit-modal-header-title">Login</div>
                    </div>
                    <TextField
                        type="email"
                        onChange={e => handleFieldChange('email', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && logIn()}
                        label="Email" />
                    <TextField
                        type="password"
                        onChange={e => handleFieldChange('password', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && logIn()}
                        label="Password" />
                    <div>Don't have an account? Register <a href="/register">here</a>.</div>
                    <Button
                        type="submit"
                        onClick={logIn}
                        disabled={!inputValuesChanged}
                        className="edit-modal-btn"
                        variant="contained">
                        Login
                    </Button>
                </Paper>
            </Container>
            <Snackbar
                open={toaster.visible}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={onToasterClose}>
                <Alert
                    variant="filled"
                    onClose={onToasterClose}
                    severity={toaster.success ? 'success' : 'error'}>
                    {toaster.message}
                </Alert>
            </Snackbar>
        </div>
    )
}