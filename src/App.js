import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Reset from "./component/Reset";
import Dashboard from "./component/Dashboard";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const router = new createBrowserRouter([
    {
      path: "/",
      element: <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />,
    },
    {
      path: "/login",
      element: <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />,
    },
    {
      path: "/register",
      element: (
        <Register isLoggedIn={isLoggedIn} login={login} logout={logout} />
      ),
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/dashboard",
      element: (
        <Dashboard isLoggedIn={isLoggedIn} login={login} logout={logout} />
      ),
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
