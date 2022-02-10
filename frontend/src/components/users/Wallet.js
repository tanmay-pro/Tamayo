import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Wallet = (props) => {

    const [curr_amt, setCurrAmt] = useState(0)
    const [money, setMoney] = useState(0);

    const onAddmoney = (event) => {
        setMoney(event.target.value);
    };

    const Reset = (event) => {
        setMoney(0);
        changeBool();
    };

    const [bool, setBool] = useState(true);
    
    const changeBool = () => {
        setBool(!bool);
        console.log(bool);
    };


    useEffect(() => {

        const newBuyer = {
            email: localStorage.getItem('email'),
        };
        
        axios
            .post("http://localhost:4000/b_signup/user_detail", newBuyer)
            .then((response) => {
                console.log(response.data);
                setCurrAmt(response.data.wallet)
            });

    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        const Money = {
            email: localStorage.getItem('email'),
            wallet: money,
        };

        axios
            .post("http://localhost:4000/b_dashboard/add_money", Money)
            .then((response) => {
                alert("Added " + money + " Rupees into your account");
                setCurrAmt(Number(curr_amt) + Number(money));
            });
        changeBool();
    };


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Balance"
                    variant="outlined"
                    value={curr_amt}
                    disabled
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Enter Amount"
                    variant="outlined"
                    value={money}
                    disabled={bool}
                    onChange={onAddmoney}
                />
            </Grid>

            <Grid item xs={12}>
                <Button style={{ marginRight: "16px" }} variant="contained" onClick={Reset}>
                    Add Money
                </Button>
                <Button variant="contained" onClick={onSubmit}>
                    Done
                </Button>
            </Grid>
        </Grid>
    );
};

export default Wallet;
