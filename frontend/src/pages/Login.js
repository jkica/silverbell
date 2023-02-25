import React, { useState, useContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginUrl } from "../constants/endpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const Login = () => {
    const navigate = useNavigate();
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [toaster, setToaster] = useState({
        visible: false,
        success: false,
        type: '',
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

    const login = () => {
        axios.post(
            LoginUrl(),
            formData,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => {
                // createPost(res.data);
                setToaster({
                    visible: true,
                    success: true,
                    type: 'create',
                    message: 'Logged In'
                });
            })
            .catch(err => {
                console.log(err)
                setToaster({
                    visible: true,
                    success: false,
                    type: 'create',
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

        toaster.success &&
        toaster.type === 'create' &&
        navigate('/');
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Paper className="edit-modal" elevation={3}>
                    <div className="edit-modal-header">
                        <div className="edit-modal-header-title">Login</div>
                    </div>
                    <TextField
                        onChange={e => handleFieldChange('email', e.target.value)}
                        label="Email" />
                    <TextField
                        onChange={e => handleFieldChange('password', e.target.value)}
                        label="Password" />
                    <Button
                        type="submit"
                        onClick={login}
                        disabled={!inputValuesChanged}
                        className="edit-modal-btn"
                        variant="contained">
                        Login
                    </Button>
                    {/*<Button*/}
                    {/*    href="/login"*/}
                    {/*    className="edit-modal-btn"*/}
                    {/*    variant="outlined">*/}
                    {/*    Cancel*/}
                    {/*</Button>*/}
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