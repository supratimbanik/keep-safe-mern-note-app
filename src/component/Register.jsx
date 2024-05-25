import NoteIcon from "@mui/icons-material/Note";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { NavLink } from "react-router-dom";
import "./styles/login.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  //Background color
  useEffect(() => {
    document.body.style.backgroundColor = " #ff7f50";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Loading state
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Set loading to true to indicate API request in progress
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            confirm: confirm,
          }),
        }
      );
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
      console.log("Error sending data!");
    } finally {
      setLoading(false); // Set loading to false after API request is complete
    }
  }

  //Components
  return (
    <div className="Register">
      <div className="logo">
        <h1>
          KeepSafe
          <NoteIcon />
        </h1>
        <div className="authentication">
          <h1>
            Register
            <AppRegistrationIcon />
          </h1>
          <form method="POST">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email ID"
              value={email}
              disabled={loading} // Disable input when loading
            />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              value={password}
              disabled={loading} // Disable input when loading
            />
            <input
              type="password"
              onChange={handleChange}
              name="confirm"
              placeholder="Confirm Password"
              value={confirm}
              disabled={loading} // Disable input when loading
            />

            <button
              onClick={(event) => {
                handleClick(event);
                setEmail("");
                setPassword("");
                setConfirm("");
              }}
            >
              {loading ? "Wait..." : "Register"}
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

export default Register;
