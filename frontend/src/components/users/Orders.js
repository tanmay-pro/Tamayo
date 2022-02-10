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
import { send } from 'emailjs-com';


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


export default function Orders() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    const currVendor = {
        vendor_email: localStorage.get('email'),
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/vorders", currVendor)
            .then(res => {
                setCards(res.data);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function increment_status(props) {
        if (props.status === "completed") {
            alert("Order is already Completed");
            return;
        }
        else if (props.status === "rejected") {
            alert("Order is already Rejected");
            return;
        }

        const newOrder = {
            _id: props._id
        };
        axios
            .post("http://localhost:4000/order/next_stage", newOrder)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "accepted") {
                    axios
                        .post("http://localhost:4000/order/check_pend", currVendor)
                        .then(res => {
                            // console.log(res.data);
                            if (parseInt(res.data) > 10) {
                                axios
                                    .post("http://localhost:4000/order/make_pending", newOrder)
                                    .then(res => {
                                        console.log(res.data);
                                        alert("Order is now pending as already 10 orders in Cooking or Accepted stage");
                                        window.location.reload();
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    }
                                    );

                            }
                            else {
                                send(
                                    'service_tedh3r8',
                                    'template_n6x6frp',
                                    {
                                        from_name: props.vendor_email,
                                        shop_name: props.shopName,
                                        to_email: props.buyer_email,
                                        item_name: props.food_item
                                    },
                                    'user_5xvrH9ZakGLiPT4LplqFm'
                                )
                                    .then((response) => {
                                        console.log('SUCCESS!', response.status, response.text);
                                        window.location.reload();
                                    })
                                    .catch((err) => {
                                        console.log('FAILED...', err);
                                        window.location.reload();
                                    });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else {
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const sendFeedback = (serviceID, templateId, variables) => {
    //     window.emailjs.send(
    //         serviceID, templateId,
    //         variables
    //     ).then(res => {
    //         console.log('Email successfully sent!')
    //     })
    //         .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    // }

    function reject_order(props) {

        const newOrder = {
            _id: props._id
        };

        console.log(newOrder);

        const currBuyer = {
            email: props.buyer_email,
            wallet: props.net_cost
        };

        // const templateId = 'template_n6x6frp';
        // const serviceID = 'my_gmail';

        // const data = {
        //     name: "Tamayo",

        // };
        // sendFeedback(serviceID, templateId, { from_name: data.name, message_html: data.comment, reply_to: data.email })
        // r.target.reset();

        axios
            .post("http://localhost:4000/order/reject_order", newOrder)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .post("http://localhost:4000/b_dashboard/add_money", currBuyer)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error) {
            });
        send(
            'service_tedh3r8',
            'template_1bite8l',
            {
                from_name: props.vendor_email,
                shop_name: props.shopName,
                to_email: props.buyer_email,
                item_name: props.food_item
            },
            'user_5xvrH9ZakGLiPT4LplqFm'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                window.location.reload();
            })
            .catch((err) => {
                console.log('FAILED...', err);
                window.location.reload();
            });
    }
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
                        </Stack>
                    </Container>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Food Item</StyledTableCell>
                                <StyledTableCell align="center">Quantity</StyledTableCell>
                                <StyledTableCell align="center">Add Ons</StyledTableCell>
                                <StyledTableCell align="center">Net Cost</StyledTableCell>
                                <StyledTableCell align="center">Placed Time</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Buyer Email</StyledTableCell>
                                <StyledTableCell align="center">Next Stage</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((row, id) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell component="th" scope="row"><h3>{row.food_item}</h3></StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography color="#808080">

                                            {
                                                row.addOnNames.map((addOn, idd) => (
                                                    <Box key={idd}>{addOn}</Box>
                                                ))}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.net_cost}</StyledTableCell>
                                    <StyledTableCell align="center">{row.placed_time}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                                    <StyledTableCell align="center">{row.buyer_email}</StyledTableCell>
                                    <StyledTableCell align="center"><Button variant="contained" onClick={() => increment_status(row)}>MOVE TO NEXT STAGE</Button></StyledTableCell>
                                    {
                                        row.status === "pending" ? <StyledTableCell align="center"><Button variant="contained" onClick={() => reject_order(row)}>REJECT ORDER</Button></StyledTableCell> : <StyledTableCell align="center"></StyledTableCell>
                                    }
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