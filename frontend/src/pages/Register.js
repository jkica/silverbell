import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterUrl } from "../constants/endpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Alert, Snackbar, TextField } from "@mui/material";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [formFilled, setFormFilled] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false)
    const [formValidation, setFormValidation] = useState({
        name: {
            valid: true,
            message: ''
        },
        email: {
            valid: true,
            message: ''
        },
        password: {
            valid: true,
            message: ''
        }
    });
    // TODO@jkica: make toaster global
    const [toaster, setToaster] = useState({
        visible: false,
        success: false,
        message: ''
    });

    const validate = (field, value) => {
        let validationData;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const formNotFilled = Object.values(formData).some(item => item === '')
        
        setFormIsValid(true)

        switch (field) {
            case 'name':
                if (value.length >= 5) {
                    validationData = {
                        valid: true,
                        message: ''
                    }
                } else {
                    validationData = {
                        valid: false,
                        message: 'Must be more than 5 characters long'
                    }
                    setFormIsValid(false);
                }
                
                break;
            case 'email':
                if (value.toLowerCase().match(emailRegex) && value.length > 0) {
                    validationData = {
                        valid: true,
                        message: ''
                    }
                } else {
                    validationData = {
                        valid: false,
                        message: 'Incorrect email format'
                    }
                    setFormIsValid(false);
                }
                
                break;
            case 'password':
                if (value.toLowerCase().match(passwordRegex) && value.length > 0) {
                    validationData = {
                        valid: true,
                        message: ''
                    }
                } else {
                    validationData = {
                        valid: false,
                        message: 'password must be 8 characters long and contain at least one number and one character'
                    }
                    setFormIsValid(false);
                }
                
                break;
        }
        
        setFormValidation(prevState => {
            return {
                ...prevState,
                [field]: validationData
            }
        });

        !formNotFilled && setFormFilled(true);
    }
    
    const handleFieldChange = (field, value) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        });
        validate(field, value);
    }
    const register = () => {
        formIsValid && formFilled && axios.post(
            RegisterUrl(),
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
                    message: 'Registered'
                });
            })
            .catch(err => {
                setToaster({
                    visible: true,
                    success: false,
                    message: 'Error'
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
                        <div className="edit-modal-header-title">Register</div>
                    </div>
                    <TextField
                        required
                        error={!formValidation.name.valid}
                        helperText={!formValidation.name.valid && formValidation.name.message}
                        onChange={e => handleFieldChange('name', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && register()}
                        label="Full Name" />
                    <TextField
                        required
                        error={!formValidation.email.valid}
                        helperText={!formValidation.email.valid && formValidation.email.message}
                        type="email"
                        onChange={e => handleFieldChange('email', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && register()}
                        label="Email" />
                    <TextField
                        required
                        error={!formValidation.password.valid}
                        helperText={!formValidation.password.valid && formValidation.password.message}
                        type="password"
                        onChange={e => handleFieldChange('password', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && register()}
                        label="Password" />
                    <div>Already have an account? Login <a href="/login">here</a>.</div>
                    <Button
                        type="submit"
                        onClick={register}
                        disabled={!formFilled || !formIsValid}
                        className="edit-modal-btn"
                        variant="contained">
                        Register
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