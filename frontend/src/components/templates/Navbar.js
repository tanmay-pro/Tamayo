import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}
          {/* <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/select")}>
            Select
        </Button> */}
          {/* <Button color="inherit" onClick={() => navigate("/vendor")}>
            Vendor
          </Button>
          <Button color="inherit" onClick={() => navigate("/byer")}>
            Buyer
          </Button> */}
          {/* <Button color="inherit" onClick={() => navigate("/b_dash")}>
            Bdash
          </Button>
          <Button color="inherit" onClick={() => navigate("/v_dash")}>
            Vdash
          </Button> */}
          {
            localStorage.getItem("auth") === "t" ?
              (
                <Button color="inherit" onClick={() => navigate("/signout")}>Sign Out</Button>
              ) :
              (
                <Button color="inherit" onClick={() => navigate("/signin")}>Sign In</Button>
              )
          }
          {
            localStorage.getItem("auth") === "t" ?
              (
                null
              ) :
              (
                <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
              )
          }
          {
            localStorage.getItem("auth") === "t" ?
              (
                localStorage.getItem("userType") === "vendor" ?
                  (
                    <Button color="inherit" onClick={() => navigate("/v_dash")}>Dashboard</Button>
                  ) :
                  (
                    <Button color="inherit" onClick={() => navigate("/b_dash")}>Dashboard</Button>
                  )
              )
              :
              (
                null
              )
          }
          {
            localStorage.getItem("auth") === "t" ?
              (
                localStorage.getItem("userType") === "vendor" ?
                  (
                    <Button color="inherit" onClick={() => navigate("/vendor")}>Edit Profile</Button>
                  ) :
                  (
                    <Button color="inherit" onClick={() => navigate("/byer")}>Edit Profile</Button>
                  )
              )
              :
              (
                null
              )
          }
          {
            localStorage.getItem("userType") === "vendor" ?
              (
                <Button color="inherit" onClick={() => navigate("/orders")}>Orders</Button>
              ) :
              (
                null
              )
          }
          {
            localStorage.getItem("userType") === "buyer" ?
              (
                <Button color="inherit" onClick={() => navigate("/wallet")}>Wallet</Button>
              ) :
              (
                null
              )
          }
          {
            localStorage.getItem("userType") === "buyer" ?
              (
                <Button color="inherit" onClick={() => navigate("/b_orders")}>My Orders</Button>
              ) :
              (
                null
              )
          }
          {
            localStorage.getItem("userType") === "vendor" ?
              (
                <Button color="inherit" onClick={() => navigate("/stat")}>Statistics</Button>
              ) :
              (
                null
              )
          }
          {
            localStorage.getItem("auth") === "t" ?
              (
                localStorage.getItem("userType") === "vendor" ?
                  (
                    <Button color="inherit" onClick={() => navigate("/vprofile")}>View Profile</Button>
                  ) :
                  (
                    <Button color="inherit" onClick={() => navigate("/bprofile")}>View Profile</Button>
                  )
              )
              :
              (
                null
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

};

export default Navbar;
