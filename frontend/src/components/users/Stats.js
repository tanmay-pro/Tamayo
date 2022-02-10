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
import OutlinedInput from '@mui/material/OutlinedInput';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

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

var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

export default function Stats() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(0);
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const currVendor = {
        email: localStorage.getItem("email")
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/get_top", currVendor)
            .then((response) => {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        axios
            .post("http://localhost:4000/order/get_counts", currVendor)
            .then((response) => {
                setCompleted(response.data.completed);
                setPending(response.data.pending);
                setTotal(response.data.total);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/make_chart")
            .then((response) => {
                data1 = response.data.data1;
                data2 = response.data.data2;
                // console.log(data1);
                // console.log(data2);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [refresh]);

    function handlechart() {
        data3 = [];
        data4 = [];
        data3 = data1;
        data4 = data2;
        console.log(data3);
        console.log(data4);
        setRefresh(!refresh);
    }
    // console.log(data);

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
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Top Food Items
                        </Typography>
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
                                <StyledTableCell align="center">Frequency</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((row, id) => (
                                    <StyledTableRow key={id}>
                                        <StyledTableCell component="th" scope="row"><h3>{row[0]}</h3></StyledTableCell>
                                        <StyledTableCell align="center">{row[1]}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Counters
                        </Typography>
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
                                <StyledTableCell>Counters</StyledTableCell>
                                <StyledTableCell align="center">Frequency</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>
                                    Orders Placed
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {total}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>
                                    Pending Orders
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {pending}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>
                                    Completed Orders
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {completed}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Graphs
                        </Typography>
                        <Stack
                            sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    </Container>
                    <Container maxWidth="sm">
                        <Typography variant="h7" color="text.primary" align="center" paragraph>
                            Age Distribution
                        </Typography>
                        <Stack
                            sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Chart style={{ height: "100px", width: "700px" }} data={data4}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </Stack>
                        <Typography variant="h7" color="text.primary" align="center" paragraph>
                            Batch Wise Distribution
                        </Typography>
                        <Stack
                            sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Chart style={{ height: "100px", width: "700px" }} data={data3}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </Stack>
                        <Button variant="contained" onClick={handlechart}>Generate</Button>
                    </Container>
                </Box>
            </main>
        </ThemeProvider >
    );
}