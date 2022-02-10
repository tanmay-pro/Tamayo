import { useState, useEffect } from "react";
import Register from "./Register";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Welcome to Tamayo");
  }, [name]);

  return <div style={{ textAlign: "center" }}>{name} - Tanmay's Canteen Portal</div>;
  //<Register />;
};

export default Home;