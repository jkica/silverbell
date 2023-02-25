import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from "@mui/material";
import { Header } from "../components/Header/Header";

// assets
import './style.css'
import { getAllUsersUrl, getCurrentUserUrl } from "../constants/endpoints";

export const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [busy, setBusy] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(getCurrentUserUrl(), {withCredentials: true})
            .then(res => {
                if (res.data) {
                    setLoggedIn(res.data.loggedIn);
                    setUser(res.data.user);
                    !res.data.loggedIn && navigate('/login');
                }
            })
    }, [])
    
    useEffect(() => {
        loggedIn && axios
            .get(getAllUsersUrl(), {withCredentials: true})
            .then(res => {
                console.log(res)
                if (res.data) {
                    setAllUsers(res.data);
                    setBusy(false);
                }
            })
    }, [loggedIn])
    
    return (
        <div className="table-wrapper">
            {
                !busy ?
                    <>
                        <Header user={user}/>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>ID</strong></TableCell>
                                        <TableCell align="left"><strong>Full Name</strong></TableCell>
                                        <TableCell align="left"><strong>Email</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        allUsers.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                onClick={() => navigate(`/users/${user.id}`)}
                                                className="table-row">
                                                <TableCell component="th" scope="user">{user.id}</TableCell>
                                                <TableCell align="left">{user.full_name}</TableCell>
                                                <TableCell align="left">{user.email}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </> :
                    <CircularProgress className="loader" />
            }
        </div>
    )
}