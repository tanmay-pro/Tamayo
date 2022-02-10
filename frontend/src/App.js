import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Select from "./components/common/Select";
import Vendor_Signup from "./components/common/Vendor_signup";
import Byer_Signup from "./components/common/Byer_signup";
import Signin from "./components/common/Signin";
import Vendor from "./components/users/Vendor";
import Byer from "./components/users/Buyer";
import Signout from "./components/common/Signout";
import Welcome from "./components/users/Welcome";
import AddItem from "./components/common/Add_item";
import Fav from "./components/users/Bfav";
import B_Dash from "./components/users/BDash";
import V_Dash from "./components/users/VDash";
import Buy from "./components/users/Buy";
import Wallet from "./components/users/Wallet";
import Edit_item from "./components/common/Edit_item";
import Orders from "./components/users/Orders";
import BOrders from "./components/users/BOrders";
import Stats from "./components/users/Stats";
import BProfile from "./components/users/BProfile";
import VProfile from "./components/users/VProfile";
import Rate from "./components/users/Rate"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="select" element={<Select />} />
          <Route path="vendor_signup" element={<Vendor_Signup />} />
          <Route path="byer_signup" element={<Byer_Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="byer" element={<Byer />} />
          <Route path="signout" element={<Signout />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="add_item" element={<AddItem />} />
          <Route path="bfav" element={<Fav />} />
          <Route path="b_dash" element={<B_Dash />} />
          <Route path="v_dash" element={<V_Dash />} />
          <Route path="buy" element={<Buy />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="edit_item" element={<Edit_item />} />
          <Route path="orders" element={<Orders />} />
          <Route path="b_orders" element={<BOrders />} />
          <Route path="stat" element={<Stats />} />
          <Route path="bprofile" element={<BProfile />} />
          <Route path="vprofile" element={<VProfile />} />
          <Route path="rating" element={<Rate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
