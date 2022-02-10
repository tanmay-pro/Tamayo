import * as React from 'react';
import { useState, useEffect } from "react";
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
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme();

function AddOns(props) {
    const handleAddOnSubmit = (event) => {
        event.preventDefault();
        const addOn = {
            name: document.getElementById(`addOnName${props.index}`).value,
            price: document.getElementById(`addOnPrice${props.index}`).value
        };
        console.log(addOn);
        // console.log(props);
        if (addOn.name === '' || addOn.price === '') {
            alert("Please enter a valid name and price");
        } else {
            if ((props.addOnNames).length < props.index) {
                alert("Make sure previous add-ons are added before adding new ones");
            } else if (props.addOnNames.length === props.index) {
                props.setAddOnNames([...props.addOnNames, addOn.name]);
                props.setAddOnPrices([...props.addOnPrices, addOn.price]);
                console.log(props.addOnNames);
                console.log(props.addOnPrices);
            } else {
                let newNames = [...props.addOnNames];
                let newPrices = [...props.addOnPrices];
                newNames[props.index] = addOn.name;
                newPrices[props.index] = addOn.price;
                console.log(newNames);
                props.setAddOnNames(newNames);
                props.setAddOnPrices(newPrices);
            }
        }
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    id={`addOnName${props.index}`}
                    label="Name"
                    fullWidth
                    size="small"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    id={`addOnPrice${props.index}`}
                    label="Price"
                    fullWidth
                    size="small"
                    type="number"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    onClick={handleAddOnSubmit}
                    fullWidth
                    variant="contained"
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}

function AddTags(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const Tags = {
            name: document.getElementById(`tags${props.index}`).value,
        }
        console.log(Tags);
        if (Tags.name === '') {
            alert("Please enter a valid name and price");
        } else {
            if (props.tags.length < props.index) {
                alert("Make sure previous Tags are added before adding new ones");
            } else if (props.tags.length === props.index) {
                props.setTag([...props.tags, Tags.name]);
            } else {
                let newTags = [...props.tags];
                newTags[props.index] = Tags.name;
                props.setTag(newTags);
            }
        }

    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
                <TextField
                    id={`tags${props.index}`}
                    label="Tag"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="inherit"
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );

}



export default function EditItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [vendorEmail, setVendorEmail] = useState("");
    const [tags, setTags] = useState([]);
    const [addOnName, setAddOnName] = useState([]);
    const [addOnPrice, setAddOnPrice] = useState([]);

    const [count, setCount] = useState(0);
    const [countTags, setCountTags] = useState(0);

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeType = (event) => {
        setType(event.target.value);
    };

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const onChangeImage = (event) => {
        setImage(event.target.value);
    };

    const onChangeVendorEmail = (event) => {
        setVendorEmail(event.target.value);
    };

    const onChangeTags = (event) => {
        setTags(event.target.value);
    };

    const onChangeAddOnName = (event) => {
        setAddOnName(event.target.value);
    };

    const onChangeAddOnPrice = (event) => {
        setAddOnPrice(event.target.value);
    };


    const vendor_email = localStorage.getItem("email");
    const element = {
        vendor_email: vendor_email,
        name: localStorage.getItem("edit_item")
    }
    
    useEffect(() => {
        axios.post("http://localhost:4000/v_dashboard/get_item", element)
            .then(res => {
                setPrice(res.data.price);
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setImage(res.data.image);
                setTags(res.data.tags);
                setAddOnName(res.data.addOnName);
                setAddOnPrice(res.data.addOnPrice);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        event.preventDefault();
        const newFoodItem = {
            name: name,
            price: document.getElementById("price").value,
            vendor_email: localStorage.getItem("email"),
            addOnName: addOnName,
            type: type,
            addOnPrice: addOnPrice,
            tags: tags,
            description: description,
            image: image
        };
        console.log(newFoodItem);
        axios
            .post("http://localhost:4000/v_dashboard/edit_item", newFoodItem)
            .then((response) => {
                alert("Item Edited Successfully");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // window.location.reload();
            });

    };

    var addOnFields = [];
    for (var x = 0; x < count; x++) {
        addOnFields.push(<AddOns key={x} index={x} addOnNames={addOnName} addOnPrices={addOnPrice} setAddOnNames={setAddOnName} setAddOnPrices={setAddOnPrice} />);
    }

    var tagFields = [];
    for (var i = 0; i < countTags; i++) {
        tagFields.push(<AddTags key={i} index={i} tags={tags} setTag={setTags} />);
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
                        Edit Item
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleChange} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={name}
                                    onChange={onChangeName}
                                    autoFocus
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type="Number"
                                    required
                                    autoComplete="price"
                                    value={price}
                                    onChange={onChangePrice}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="Select Type of Food"
                                            onChange={onChangeType}>
                                            <MenuItem value={"veg"}>Veg</MenuItem>
                                            <MenuItem value={"non-veg"}>Non-Veg</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => { setCount(count + 1) }}
                                > ADD FOOD ADD-ON</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {addOnFields}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => { setCountTags(countTags + 1) }}
                                > ADD TAGS</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {tagFields}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    type="text"
                                    autoComplete="description"
                                    value={description}
                                    onChange={onChangeDescription}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="image"
                                    label="Enter Image URL"
                                    name="image"
                                    type="text"
                                    autoComplete="image"
                                    value={image}
                                    onChange={onChangeImage}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Edit
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


