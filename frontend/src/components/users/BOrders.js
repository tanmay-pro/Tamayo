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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { collapseClasses } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import localStorage from 'local-storage';
import Rating from '@mui/material/Rating';


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


const theme = createTheme();

var id;

export default function Orders(props) {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [value, setValue] = React.useState(2);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currBuyer = {
        buyer_email: localStorage.get('email')
    };

    const handleChange = (event) => {
        setValue(event.target.value)
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/borders", currBuyer)
            .then(res => {
                setCards(res.data);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    // function rate_product(row) {
    //     console.log(row);
    //     id = row._id;
    //     console.log(id);

    // }

    // function Finalise(props) {
    //     const order_rate = {
    //         rating: value,
    //         _id: props._id
    //     };
    //     axios
    //         .post("http://localhost:4000/order/rate", order_rate)
    //         .then((response) => {
    //             console.log(response.data);
    //             // window.location.reload();
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
        
    // }

    return (<ThemeProvider theme={theme}>
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
                    </Stack>
                </Container>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Food Item</StyledTableCell>
                            <StyledTableCell align="center">Quantity</StyledTableCell>
                            <StyledTableCell align="center">Net Cost</StyledTableCell>
                            <StyledTableCell align="center">Placed Time</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Vendor Email</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row, id) => (
                            <StyledTableRow key={id}>
                                <StyledTableCell component="th" scope="row"><h3>{row.food_item}</h3></StyledTableCell>
                                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                <StyledTableCell align="center">{row.net_cost}</StyledTableCell>
                                <StyledTableCell align="center">{row.placed_time}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                <StyledTableCell align="center">{row.vendor_email}</StyledTableCell>
                                {/* {
                                    row.status === "completed" ? (row.rating_status === -1 ? <StyledTableCell align="center"><Button variant="contained">Rate</Button></StyledTableCell> : <StyledTableCell align="center"><Button variant="contained" disabled>Rate</Button></StyledTableCell>) : null
                                } */}
                                {
                                    row.status === "completed" ? (row.rating_status === -1 ? <StyledTableCell align="center"><div>
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                            Rate
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Rate Your Order</DialogTitle>
                                            <DialogContent>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={value}
                                                            label="Rating"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                            <MenuItem value={5}>5</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button onClick={handleClose}>Done</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div></StyledTableCell> : <StyledTableCell align="center"><Button variant="contained" disabled>Rate</Button></StyledTableCell>) : null
                                }
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
        {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            </Box> */}
    </ThemeProvider >);
}