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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Buy(props) {
    const theme = useTheme();
    // localStorage.setItem("net_cost", localStorage.getItem("item_price"));
    const [netCost, setNetCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const addonName = localStorage.getItem('addOnName');
    const [addOns, setAddOns] = useState([]);
    const [addOnPrice, setAddOnPrice] = useState([]);
    const addonPrice = localStorage.getItem('addOnPrice');
    const [selAddOns, setSelAddOns] = useState([]);
    const [selAddOnPrice, setSelAddOnPrice] = useState([]);

    // console.log(addonName.split(','));
    const onChangeQuantity = (event) => {
        // console.log(event);
        setQuantity(event.target.value);
        updateCost();
    };

    useEffect(() => {
        setAddOns(addonName.split(','));
        setAddOnPrice(addonPrice.split(','));
    }, [addonName]);

    function updateCost() {
        console.log(selAddOnPrice);
        var temp = parseInt(localStorage.getItem("item_price")) * parseInt(document.getElementById("quantity").value);
        for (var i = 0; i < selAddOnPrice.length; i++) {
            temp += parseInt(selAddOnPrice[i]);
        }
        setNetCost(temp);
        localStorage.setItem("net_cost", temp);
    }

    function order_succ(send_data) {
        alert("Order placed successfully");
        axios
            .post("http://localhost:4000/b_dashboard/deduct_money", send_data)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        const newBuyer = {
            email: localStorage.getItem("email")
        };

        axios
            .post("http://localhost:4000/b_signup/user_detail", newBuyer)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("batch", response.data.batchType);
                localStorage.setItem("age", response.data.age);
            })
            .catch(function (error) {
                console.log(error);
            });

        const newOrder = {
            placed_time: time,
            food_item: localStorage.getItem("item_name"),
            quantity: document.getElementById("quantity").value,
            net_cost: parseInt(localStorage.getItem("net_cost")),
            vendor_email: localStorage.getItem("item_vendor_email"),
            buyer_email: localStorage.getItem("email"),
            addOnNames: selAddOns,
            batch: localStorage.getItem("batch"),
            age: localStorage.getItem("age")
        };
        axios
            .post("http://localhost:4000/order/add_order", newOrder)
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("item_name");
                localStorage.removeItem("item_price");
                localStorage.removeItem("item_vendor_email");
                localStorage.removeItem("addOnName");
                localStorage.removeItem("addOnPrice");
                localStorage.removeItem("wallet");
                localStorage.removeItem("net_cost");
                localStorage.removeItem("batch");
                localStorage.removeItem("age");
                window.location.href = "/b_dash";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function order_items() {
        const send_data = {
            email: localStorage.getItem("email"),
            wallet: localStorage.getItem("net_cost")
        };
        console.log(send_data);

        if (parseInt(localStorage.getItem("wallet")) < netCost) {
            alert("Insufficient balance");
            localStorage.removeItem("item_name");
            localStorage.removeItem("item_price");
            localStorage.removeItem("item_vendor_email");
            localStorage.removeItem("addOnName");
            localStorage.removeItem("addOnPrice");
            localStorage.removeItem("wallet");
            localStorage.removeItem("net_cost");
            window.location.href = "/b_dash";

        }
        else {
            localStorage.setItem("wallet", parseInt(localStorage.getItem("wallet")) - netCost);
            order_succ(send_data);
        }
    }

    return (
        <Box>
            <Container maxWidth="sm">
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Wallet: ₹  {Number(localStorage.getItem("wallet"))}
                </Typography>
                <Stack
                    sx={{ pt: 3 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                </Stack>
            </Container>
            <Box>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        type="number"
                        // autoComplete="age"
                        value={quantity}
                        onChange={onChangeQuantity}

                    />
                </Grid>
                <Grid >
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={selAddOns}
                            onChange={(event) => {
                                const {
                                    target: { value },
                                } = event;
                                setSelAddOns(
                                    typeof value === 'string' ? value.split(',') : value,
                                );
                                setSelAddOnPrice(selAddOns.map((addon) => { return addOnPrice[addOns.indexOf(addon)]; }));
                                console.log(selAddOnPrice);
                                var temp = parseInt(localStorage.getItem("item_price")) * parseInt(document.getElementById("quantity").value);
                                for (var i = 0; i < selAddOnPrice.length; i++) {
                                    temp += parseInt(selAddOnPrice[i]);
                                }
                                setNetCost(temp);
                                localStorage.setItem("net_cost", temp);
                            }}
                            input={<OutlinedInput label="Add Ons" />}
                            MenuProps={MenuProps}
                        >
                            {addOns.map((name, idd) => (
                                <MenuItem
                                    key={idd}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                    <TextField
                        label="Net Cost"
                        variant="outlined"
                        value={netCost}
                        disabled
                    />
                </Grid> */}
                <Grid >
                    <Button variant="contained" color="primary" onClick={() => order_items()}>
                        Order
                    </Button>
                </Grid>
            </Box>
        </Box >);
}