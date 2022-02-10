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

var check_var = false;

const set_true = (event) => {
    check_var = true;
}


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

function delete_item(props) {
    const send_data = {
        vendor_email: localStorage.getItem("email"),
        name: props.name
    };

    axios
        .post("http://localhost:4000/v_dashboard/delete_item", send_data)
        .then((response) => {
            console.log(response.data);
            alert("Item Deleted");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}


export default function VendorDash(props) {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState("");
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const currVendor = {
        vendor_email: localStorage.getItem("email")
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function edit_item(props) {

        localStorage.setItem("edit_item", props.name);
        navigate("/edit_item");

    }
    useEffect(() => {
        axios
            .post("http://localhost:4000/v_dashboard/display_items", currVendor)
            .then((response) => {
                setCards(response.data);
                //    console.log(response.data);
                //    console.log(cards);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        {/* <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Food Items
                        </Typography> */}
                        {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography> */}
                        <Stack
                            sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={() => navigate("/add_item")}>Add Item</Button>
                            {/* <Button variant="outlined">Secondary action</Button> */}
                        </Stack>
                    </Container>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Food Item</StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Tags</StyledTableCell>
                                <StyledTableCell align="center">Add Ons</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((row, id) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell component="th" scope="row"><h3>{row.name}</h3></StyledTableCell>
                                    <StyledTableCell align="center"><img src={row.image} width="70" height="70"></img></StyledTableCell>
                                    <StyledTableCell align="center">₹ {row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography color="#808080">
                                            <h5>
                                                <div>
                                                    {
                                                        row.tags.map((tag, idd) => (
                                                            <Box key={idd}>{tag}</Box>
                                                        ))}
                                                    {/* <StyledTableCell align="center">{row.tags}</StyledTableCell> */}
                                                </div>
                                            </h5>
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography color="#808080">
                                            <h5>
                                                <div>
                                                    {
                                                        row.addOnName.map((addOn, idd) => (
                                                            <Box key={idd}>{addOn}</Box>
                                                        ))}
                                                    {/* <StyledTableCell align="center">{row.tags}</StyledTableCell> */}
                                                </div>
                                            </h5>
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography color="#808080">
                                            <h5>{row.description}
                                            </h5>
                                        </Typography></StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" onClick={() => edit_item(row)}>Edit</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" onClick={() => delete_item(row)}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            </Box> */}
        </ThemeProvider >
    );


}