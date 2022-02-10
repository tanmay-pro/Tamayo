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

const theme = createTheme();

export default function EditData(props) {
    const [mangFirstName, setMangFirstName] = useState("");
    const [mangLastName, setMangLastName] = useState("");
    const [shopName, setShopName] = useState("");
    const [contact, setContact] = useState(0);
    const [email, setEmail] = useState("");
    const [canteenOpen, setCanteenOpen] = useState("");
    const [canteenClose, setCanteenClose] = useState("");

    const onChangeMangFirstName = (e) => {
        setMangFirstName(e.target.value);
    }

    const onChangeMangLastName = (e) => {
        setMangLastName(e.target.value);
    }

    const onChangeShopName = (e) => {
        setShopName(e.target.value);
    }

    const onChangeContact = (e) => {
        setContact(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeCanteenOpen = (e) => {
        setCanteenOpen(e.target.value);
    }

    const onChangeCanteenClose = (e) => {
        setCanteenClose(e.target.value);
    }


    // const newBuyer = {
    //     email: localStorage.getItem("email"),
    // };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newVendor = {
            mangFirstName: data.get("mangFirstName"),
            mangLastName: data.get("mangLastName"),
            shopName: data.get("shopName"),
            email: localStorage.getItem("email"),
            contact: data.get("contact"),
            canteenOpen: data.get("canteenOpen"),
            canteenClose: data.get("canteenClose")
        };
        console.log(newVendor);
        axios
            .post("http://localhost:4000/v_signup/edit", newVendor)
            .then((response) => {
                console.log(response.data);
                alert("Successfully Updated");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                        Edit
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
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}