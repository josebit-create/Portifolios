import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import { Navigate } from "react-router-dom";

const AppRouter: React.FC = () => {
  const { auth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={!auth ? <Navigate to="/login" /> : <Cart />}
          />
          <Route
            path="/profile"
            element={!auth ? <Navigate to="/login" /> : <Profile />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
