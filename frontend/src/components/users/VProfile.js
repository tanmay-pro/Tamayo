import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { useState, useEffect } from "react";

const theme = createTheme();

export default function SignUp(props) {
    const [mangFirstName, setMangFirstName] = useState("");
    const [mangLastName, setMangLastName] = useState("");
    const [shopName, setShopName] = useState("");
    const [contact, setContact] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [canteenOpen, setCanteenOpen] = useState("");
    const [canteenClose, setCanteenClose] = useState("");


    const onChangeMangFirstName = (event) => {
        setMangFirstName(event.target.value);
    };

    const onChangeMangLastName = (event) => {
        setMangLastName(event.target.value);
    };

    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    };

    const onChangeContact = (event) => {
        setContact(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeCanteenOpen = (event) => {
        setCanteenOpen(event.target.value);
    };

    const onChangeCanteenClose = (event) => {
        setCanteenClose(event.target.value);
    };

    const newVendor = {
        email: localStorage.getItem("email")
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/v_signup/user_detail", newVendor)
            .then((response) => {
                console.log(response.data);
                setMangFirstName(response.data.mangFirstName);
                setMangLastName(response.data.mangLastName);
                setShopName(response.data.shopName);
                setContact(response.data.contact);
                setEmail(response.data.email);
                setCanteenOpen(response.data.canteenOpen);
                setCanteenClose(response.data.canteenClose);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={14} sm={7}>
                                <TextField
                                    autoComplete="given-name"
                                    name="mangFirstName"
                                    fullWidth
                                    id="mangFirstName"
                                    label="Manager's First Name"
                                    value={mangFirstName}
                                    disabled
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={14} sm={7}>
                                <TextField
                                    fullWidth
                                    id="mangLastName"
                                    label="Manager's Last Name"
                                    name="mangLastName"
                                    value={mangLastName}
                                    disabled
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="shopName"
                                    label="Shop Name"
                                    name="shopName"
                                    value={shopName}
                                    disabled
                                // autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    id="contact"
                                    type="number"
                                    label="Contact"
                                    name="contact"
                                    value={contact}
                                    disabled
                                // autoComplete="contact"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    disabled
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    id="canteenOpen"
                                    label="Canteen Opening Time"
                                    name="canteenOpen"
                                    value={canteenOpen}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    id="canteenClose"
                                    label="Canteen Closing Time"
                                    name="canteenClose"
                                    value={canteenClose}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}