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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const theme = createTheme();

export default function EditData(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [batchType, setBatchType] = useState("");


  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatchType = (event) => {
    setBatchType(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const newBuyer = {
    email: localStorage.getItem("email"),
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/b_signup/user_detail", newBuyer)
      .then((response) => {
        // console.log(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setContact(response.data.contact);
        setEmail(response.data.email);
        setAge(response.data.age);
        setBatchType(response.data.batchType);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newBuyer = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      contact: data.get('contact'),
      age: data.get('age'),
      email: localStorage.getItem('email'),
      batchType: data.get('batchType'),
    };
    console.log(newBuyer);
    axios
      .post("http://localhost:4000/b_signup/edit", newBuyer)
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={onChangeFirstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  type="number"
                  // autoComplete="age"
                  value={age}
                  onChange={onChangeAge}

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
                  autoComplete="contact"
                  value={contact}
                  onChange={onChangeContact}
                // autoComplete="contact"
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl required fullWidth>
                      <InputLabel id="demo-simple-select-label">User</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={batchType}
                        label="Select Batch Name"
                        name="batchType"
                        onChange={onChangeBatchType}>
                        <MenuItem value={"ug1"}>UG1</MenuItem>
                        <MenuItem value={"ug2"}>UG2</MenuItem>
                        <MenuItem value={"ug3"}>UG3</MenuItem>
                        <MenuItem value={"ug4"}>UG4</MenuItem>
                        <MenuItem value={"ug5"}>UG5</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}