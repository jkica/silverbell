import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'
import { getCurrentUserUrl } from "../constants/endpoints";

// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from "@mui/material";

export const Home = () => {
    const allUsers = [
        {
            id: 1,
            name: 'banana',
            email: 'banan@mail.com'
        },
        {
            id: 2,
            name: 'banana2',
            email: 'banan2@mail.com'
        }]
    const [loggedIn, setLoggedIn] = useState(false);
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // redirect to login if not authenticated
        axios.get(getCurrentUserUrl())
            .then(res => {
                console.log('banana auth', res.data)
                !(res.data && res.data.loggedIn) && navigate('/login');
            })
        // navigate('/register')
    }, [])
    
    // useEffect(() => {
    //     busy && axios.get(getAllUsersUrl())
    //         .then(res => {
    //             initPosts(res.data)
    //             setBusy(false);
    //         })
    //         .catch(err => {
    //             // TODO@jkcia: catch error
    //
    //             setBusy(false);
    //         })
    // }, [])

    return (
        <div className="table-wrapper">
            {
                !busy ?
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell align="left"><strong>Title</strong></TableCell>
                                    <TableCell align="left"><strong>Description</strong></TableCell>
                                    <TableCell align="left"><strong>User ID</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    allUsers.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            onClick={() => navigate(`/users/${user.id}`)}
                                            className="table-row">
                                            <TableCell component="th" scope="user">{user.name}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <CircularProgress className="loader" />
            }
        </div>
    )
}