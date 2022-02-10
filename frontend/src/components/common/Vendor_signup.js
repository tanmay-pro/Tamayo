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
import { useState } from "react";

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

    const resetInputs = () => {
        setMangFirstName("");
        setMangLastName("");
        setShopName("");
        setContact(0);
        setEmail("");
        setPassword("");
        setCanteenOpen("");
        setCanteenClose("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        for (var values of data.values()) {
            console.log(values);
        }
        const newVendor = {
            mangFirstName: data.get('mangFirstName'),
            mangLastName: data.get('mangLastName'),
            shopName: data.get('shopName'),
            contact: data.get('contact'),
            email: data.get('email'),
            password: data.get('password'),
            canteenOpen: data.get('canteenOpen'),
            canteenClose: data.get('canteenClose')
        };

        axios
            .post("http://localhost:4000/v_signup/register", newVendor)
            .then(res => {
                alert("Created\t" + res.data.mangFirstName);
            })
            .catch(err => {
                alert("Error\t" + err);
            })
        // resetInputs();
    };

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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={14} sm={7}>
                                <TextField
                                    autoComplete="given-name"
                                    name="mangFirstName"
                                    required
                                    fullWidth
                                    id="mangFirstName"
                                    label="Manager's First Name"
                                    value={mangFirstName}
                                    onChange={onChangeMangFirstName}
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
                                    onChange={onChangeMangLastName}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="shopName"
                                    label="Shop Name"
                                    name="shopName"
                                    value={shopName}
                                    onChange={onChangeShopName}
                                // autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contact"
                                    type="number"
                                    label="Contact"
                                    name="contact"
                                    value={contact}
                                    onChange={onChangeContact}
                                // autoComplete="contact"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="canteenOpen"
                                    label="Canteen Opening Time"
                                    name="canteenOpen"
                                    value={canteenOpen}
                                    onChange={onChangeCanteenOpen}
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="canteenClose"
                                    label="Canteen Closing Time"
                                    name="canteenClose"
                                    value={canteenClose}
                                    onChange={onChangeCanteenClose}
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}