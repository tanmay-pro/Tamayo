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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
import Fuse from "fuse.js";
import { PeopleSharp } from '@mui/icons-material';
import Chip from '@mui/material/Chip';

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

var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];

function ControlledCheckbox(props) {

    return (
        <Box>
            <div> Veg
                <Checkbox
                    checked={props.veg}
                    onChange={props.handleChange1}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <div>
                Nonveg
                <Checkbox
                    checked={props.nonveg}
                    onChange={props.handleChange2}
                    inputProps={{ 'aria-label': 'controlled' }}

                />
            </div>
        </Box>
    );
}



export default function BuyerDash(props) {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [cards2, setCards2] = useState([]);
    const [shopName, setShopName] = useState([]);
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState("");
    const [wallet, setWallet] = React.useState(0);
    const [openingTime, setOpeningTime] = useState([]);
    const [closingTime, setClosingTime] = useState([]);
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeWallet = (e) => {
        setWallet(e.target.value);
    };


    var shop_name = [];
    var opening_time = [];
    var closing_time = [];

    const currBuyer = {
        vendor_email: localStorage.getItem("email")
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

    useEffect(() => {
        axios
            .post("http://localhost:4000/b_signup/user_detail", currBuyer2)
            .then(res => {
                // console.log(res.data);
                setWallet(res.data.wallet);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        axios
            .get("http://localhost:4000/v_dashboard/")
            .then((response) => {
                setCards(response.data);
                setCards2(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {

        // console.log(cards);
        for (let i = 0; i < cards.length; i++) {
            getShopName(cards[i]);
            getOpeningTime(cards[i]);
            getClosingTime(cards[i]);
            // console.log(k);
            // shop_name.push(k);
        }
        // setShopName(shop_name);
        // console.log(shop_name);
        // console.log(shopName);
    }, [cards]);

    function getShopName(props) {
        const newVendor = {
            email: props.vendor_email
        };

        axios
            .post("http://localhost:4000/v_dashboard/get_vendor", newVendor)
            .then(res => {
                // console.log(res.data.shopName);
                setShopName((shopName) => [...shopName, res.data.shopName]);
                return res.data.shopName;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getOpeningTime(props) {
        const newVendor = {
            email: props.vendor_email
        };

        axios
            .post("http://localhost:4000/v_dashboard/get_vendor", newVendor)
            .then(res => {
                setOpeningTime((openingTime) => [...openingTime, res.data.canteenOpen]);
                return res.data.canteenpPen;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getClosingTime(props) {
        const newVendor = {
            email: props.vendor_email
        };

        axios
            .post("http://localhost:4000/v_dashboard/get_vendor", newVendor)
            .then(res => {
                setClosingTime((closingTime) => [...closingTime, res.data.canteenClose]);
                setLoading(false);
                return res.data.canteenClose;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function add_to_fav(props) {
        console.log("Inside add to fav");
        const send_data = {
            email: localStorage.getItem("email"),
            vendor_email: props.vendor_email,
            food_name: props.name
        };
        axios
            .post("http://localhost:4000/b_dashboard/add_fav", send_data)
            .then(res => {
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function buy_navigate(props) {
        // console.log(props);
        localStorage.setItem("item_name", props.name);
        localStorage.setItem("item_price", props.price);
        localStorage.setItem("item_vendor_email", props.vendor_email);
        localStorage.setItem("addOnName", props.addOnName);
        localStorage.setItem("addOnPrice", props.addOnPrice);
        localStorage.setItem("wallet", wallet);
        // console.log(localStorage.getItem("addOnName"));
        // console.log(localStorage.getItem("addon_prices"));
        navigate("/buy");

    }

    function func_check_avail(props) {

        var today = new Date(),
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var currTime = time.split(":");
        var currTimeinSecs = (parseInt(currTime[0]) * 3600) + (parseInt(currTime[1]) * 60) + parseInt(currTime[2]);
        return true;
    }

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

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }


    const searchItem = (query) => {
        if (!query) {
            setCards(cards2);
            return;
        }
        const fuse = new Fuse(cards, {
            keys: ["name"]
        });
        const result = fuse.search(query);
        const finalResult = [];
        if (result.length) {
            result.forEach((item) => {
                finalResult.push(item.item);
            });
            setCards(finalResult);
        } else {
            setCards([]);
        }
    };
    const [min, setmin] = React.useState(0)
    const [max, setmax] = React.useState(2000)
    const [veg, setVeg] = React.useState(true);
    const [nonveg, setNonveg] = React.useState(true);

    const handleChange1 = (event) => {
        setVeg(event.target.checked);
    };
    const handleChange2 = (event) => {
        setNonveg(event.target.checked);
    };
    const [sortName, setSortName] = useState(true);
    const [sRate, setSRate] = useState(true);


    const priceSort = () => {
        let temp = [...cards]
        const flag = sortName;
        temp.sort((a, b) => {
            if (a.price != undefined && b.price != undefined) {
                return (1 - flag * 2) * (a.price - b.price);
            } else {
                return 1;
            }
        });

        setCards(temp)
        setSortName(!sortName);


    };
    const rateSort = () => {
        let temp = [...cards]
        const flag = sortName;
        temp.sort((a, b) => {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            } else {
                return 1;
            }
        });

        setCards(temp)
        setSRate(!sRate);
    };



    const [tagtext, settagtext] = React.useState("")
    const [stags, setstags] = React.useState([])
    const handletagsearch = (event) => {
        event.preventDefault();
        let temp = [...tags]
        temp.push(event.target.value)
        setstags(temp)
    };

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}>
                <Container maxWidth="sm">
                    <Box>
                        <div className="search-container">
                            <input
                                type="search"
                                onChange={(e) => searchItem(e.target.value)}
                                placeholder="Fuzzy Search"
                            />
                        </div>
                    </Box>
                    <Box>
                        <ControlledCheckbox handleChange1={handleChange1} handleChange2={handleChange2} veg={veg} nonveg={nonveg} />
                    </Box>
                    <Box>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="#########"
                                    label="tags"
                                    fullWidth
                                    value={tagtext}
                                    onChange={(e) => settagtext(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={8} sm={4}>
                                <Button
                                    onClick={handletagsearch}
                                    fullWidth
                                    variant="contained"
                                    color="inherit"
                                >
                                    set tags
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete=""
                                name="min"
                                required
                                fullWidth
                                id="min"
                                label="min"
                                value={min}
                                onChange={(event) => setmin(event.target.value)}
                                autoFocus
                            />
                            <TextField
                                autoComplete=""
                                name="max"
                                required
                                fullWidth
                                id="max"
                                label="max"
                                value={max}
                                onChange={(event) => setmax(event.target.value)}
                                autoFocus
                            />

                        </Grid>
                        <Grid>

                        </Grid>
                    </Box>
                    <Box>
                        <div>
                            <Button onClick={priceSort}>
                                Price
                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                            <Button onClick={rateSort}>
                                Rating
                                {sRate ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                        </div>

                    </Box>

                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        <Button variant="contained" onClick={() => navigate("/bfav")}>View My Favourites</Button>
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Wallet: ₹  {wallet}
                    </Typography>
                    <Stack
                        sx={{ pt: 3 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        {/* <Button variant="outlined">Secondary action</Button> */}
                    </Stack>
                </Container>
            </Box >
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
                            <StyledTableCell align="center">Shop</StyledTableCell>
                            <StyledTableCell align="center">Rating</StyledTableCell>
                            <StyledTableCell align="center">Commands</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row, id) => (
                            ((row.type === "veg" && veg === true || row.type === "non-veg" && nonveg === true || !veg === true && !nonveg === true) && (row.price >= min && row.price <= max))
                                ?
                                (
                                    <StyledTableRow key={id}>
                                        <StyledTableCell component="th" scope="row"><h3>{row.name}</h3></StyledTableCell>
                                        <StyledTableCell align="center"><img src={row.image} width="70" height="70"></img></StyledTableCell>
                                        <StyledTableCell align="center">₹ {row.price}</StyledTableCell>
                                        <StyledTableCell align="center">{row.type}</StyledTableCell>
                                        <StyledTableCell align="center">

                                            <Typography color="#808080">
                                                {
                                                    row.tags.map((tag, idd) => (

                                                        <Box key={idd}>{tag}</Box>
                                                    ))}
                                                {/* <StyledTableCell align="center">{row.tags}</StyledTableCell> */}

                                            </Typography>

                                        </StyledTableCell>
                                        <StyledTableCell align="center">

                                            <Typography color="#808080">
                                                {
                                                    row.addOnName.map((addOn, idd) => (
                                                        <Box key={idd}>{addOn}</Box>
                                                    ))}
                                                {/* <StyledTableCell align="center">{row.tags}</StyledTableCell> */}
                                            </Typography>

                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography color="#808080">
                                                {row.description}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{shopName[id]}</StyledTableCell>
                                        {
                                            row.rating === -1 ? <StyledTableCell align="center">Unrated</StyledTableCell> : <StyledTableCell align="center">{row.rating}</StyledTableCell>
                                        }
                                        <StyledTableCell align="center">
                                            <Button variant="contained" onClick={() => add_to_fav(row)}>Fav</Button>
                                            {
                                                func_check_avail(row) === true ? <Button variant="contained" onClick={() => buy_navigate(row)}>Buy</Button> : <Button variant="contained" disabled>Buy</Button>
                                            }
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ) :
                                (
                                    null
                                )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main >
    );

}