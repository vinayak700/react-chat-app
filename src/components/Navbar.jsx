import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);  
  return (
    <div className="navbar">
      <span className="logo">Echo Chat</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt="myimg" />
        <span>{currentUser?.name}</span>
        <button
          onClick={() => signOut(auth)}
          style={{
            backgroundColor: "lightgray",
            width: "100%",
            margin: "10px",
            padding: "10px 15px",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "black",
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
