import NoteIcon from "@mui/icons-material/Note";
import LoginIcon from "@mui/icons-material/Login";
import "./styles/login.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  //Background color
  useEffect(() => {
    document.body.style.backgroundColor = " #ff7f50";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  //State for error
  const [errorMessage, setError] = useState("");

  //State for input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleInput(event) {
    setError("");
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  //Connecting to server on click
  async function handleClick(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        setError(data.message);
      } else {
        props.login();
        navigate(`/dashboard?email=${email}`);
      }
    } catch (err) {
      setError("Internal error!");
      console.log("Error sending data! ");
    }
  }

  //Components
  return (
    <div className="Login">
      <div className="logo">
        <h1>
          KeepSafe
          <NoteIcon />
        </h1>
        <div className="authentication">
          <h1>
            Login
            <LoginIcon />
          </h1>
          <form method="POST">
            <input
              type="email"
              name="email"
              onChange={handleInput}
              placeholder="Email ID"
              value={email}
            />
            <input
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Password"
              value={password}
            />
            <button
              onClick={(event) => {
                handleClick(event);
                setEmail("");
                setPassword("");
              }}
            >
              LogIn
            </button>
          </form>
          <div className="login-text">
            Click here to{" "}
            <NavLink className="link" to="/register">
              Register
            </NavLink>
          </div>
          <div className="login-text">
            Forgot password?
            <NavLink className="link" to="/reset">
              Reset
            </NavLink>
          </div>
          <div className="error-text">{errorMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
