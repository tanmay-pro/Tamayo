import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Vendor_Signup from "./Vendor_signup";
import Byer_Signup from "./Byer_signup";

export default function BasicSelect() {
    const [userType, setUserType] = React.useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <Box>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userType}
                    label="Select User"
                    onChange={handleChange}>
                    <MenuItem value={"Vendor"}>Vendor</MenuItem>
                    <MenuItem value={"Buyer"}>Buyer</MenuItem>
                </Select>
            </FormControl>
        </Box>
        {
            (userType === "Vendor") ? <Vendor_Signup /> : (userType === "Buyer" ? <Byer_Signup /> : null)
        }
        </Box>
    );

}
