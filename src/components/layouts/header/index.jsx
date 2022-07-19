import React, { useEffect } from "react";
import "./index.css";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Menu, MenuItem, IconButton } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

import { auth, logout } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  console.log("error: ", error);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (path) => {
    navigate(path, { replace: true });
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__icon" src="./logo.png" alt="" />
      </Link>

      <div className="header__center">
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header__right">
        <Link to="/products/create">Become a host</Link>
        <LanguageIcon />
        <ExpandMoreIcon />
        <IconButton
          ria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar />
        </IconButton>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {!loading && !user && (
          <MenuItem onClick={() => handleRedirect("/login")}>Login</MenuItem>
        )}
        {!loading && !user && (
          <MenuItem onClick={() => handleRedirect("/register")}>
            Register
          </MenuItem>
        )}
        {!loading && user && (
          <MenuItem onClick={() => handleRedirect("/account")}>
            Account
          </MenuItem>
        )}
        {!loading && user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
      </Menu>
    </div>
  );
}

export default Header;
