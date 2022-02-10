import { useState, useEffect } from "react";

const Home = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     setName("Welcome to Tamayo");
//   }, [name]);

  return <h1><div style={{ textAlign: "center" }}>Welcome {localStorage.getItem("userType")}</div></h1>;
};

export default Home;