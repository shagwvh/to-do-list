import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();
  const logoutUser = () => {
    localStorage.setItem('token','');
    history('/')
  }
  return (
    <header className="header">
      <div className="title">Task Manager</div>
      <div className="logout" onClick={()=>logoutUser()}>Logout</div>
    </header>
  );
};

export default Header;