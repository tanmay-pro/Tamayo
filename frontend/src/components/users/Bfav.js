import * as React from 'react';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import AddItem from "../common/Add_item";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';

const theme = createTheme();


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function VendorDash(props) {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [shopName, setShopName] = useState([]);
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const currBuyer2 = {
        email: localStorage.getItem("email")
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [favName, setFavName] = useState([]);
    const [favEmail, setFavEmail] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/b_signup/user_detail", currBuyer2)
            .then((response) => {
                setFavName(response.data.favName);
                setFavEmail(response.data.favEmail);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}>
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: 3 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        {/* <Button variant="outlined">Secondary action</Button> */}
                    </Stack>
                </Container>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Food Item</StyledTableCell>
                            <StyledTableCell align="center">Vendor Email</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {favName.map((row, id) => (
                            <StyledTableRow key={id}>
                                <StyledTableCell component="th" scope="row"><h3>{favName[id]}</h3></StyledTableCell>
                                <StyledTableCell align="center"><h4>{favEmail[id]}</h4></StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main >
    );
}