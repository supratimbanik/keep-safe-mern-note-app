import NoteIcon from "@mui/icons-material/Note";
import LockResetIcon from "@mui/icons-material/LockReset";
import { NavLink } from "react-router-dom";
import "./styles/login.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reset() {
  const navigate = useNavigate();
  //Background color
  useEffect(() => {
    document.body.style.backgroundColor = " #ff7f50";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  //State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  //State for error
  const [errorMessage, setError] = useState("");

  function handleChange(event) {
    setError("");
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirm") {
      setConfirm(value);
    }
  }

  //Connecting to server on click
  async function handleClick(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reset`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirm: confirm,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        setError(data.message);
      } else {
        alert("Password reset done!");
        navigate(`/login`);
      }
    } catch (err) {
      setError("Internal error!");
      console.log("Error sending data!");
    }
  }

  //Components
  return (
    <div className="Reset">
      <div className="logo">
        <h1>
          KeepSafe
          <NoteIcon />
        </h1>
        <div className="authentication">
          <h1>
            Reset
            <LockResetIcon />
          </h1>
          <form method="POST">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email ID"
              value={email}
            />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              value={password}
            />
            <input
              type="password"
              onChange={handleChange}
              name="confirm"
              placeholder="Confirm Password"
              value={confirm}
            />

            <button
              onClick={(event) => {
                handleClick(event);
                setEmail("");
                setPassword("");
                setConfirm("");
              }}
            >
              Reset
            </button>
          </form>
          <div className="login-text">
            {" "}
            Click here to{" "}
            <NavLink className="link" to="/">
              Login
            </NavLink>
          </div>
          <div className="error-text">{errorMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
