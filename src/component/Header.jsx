import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoteIcon from "@mui/icons-material/Note";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Handling logout
  const handleLogout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    if (logout) {
      props.logout();
      navigate("/login", { replace: true });
    }
  };

  //Handling account delete request
  async function handleDeleteAccount() {
    const deleteAccount = window.confirm(
      "Are you sure you want to delete your account? Once deleted data will be lost permanently!"
    );
    if (deleteAccount) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/dashboard/account-delete`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              email: props.email,
            }),
          }
        );
        const result = await response.json();
        if (!response.ok) {
          alert(result.message);
          return;
        }
        props.logout();
        navigate("/login");
      } catch (err) {
        console.log("Error deleting account!");
      }
    }
  }

  return (
    <header className="Header">
      <h1>
        KeepSafe
        <NoteIcon />
      </h1>
      <div className="user">{props.email}</div>
      <button onClick={handleClick}>
        <AccountCircleIcon style={{ fontSize: "2rem" }} />
      </button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>
          Logout
          <LogoutIcon style={{ marginLeft: 80 }} />
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount}>
          Delete account <PersonRemoveIcon style={{ marginLeft: 20 }} />
        </MenuItem>
      </Menu>
    </header>
  );
}
export default Header;
