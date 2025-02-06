import "./NavBar.css";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout, reset } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { getProductsCart } from "../slices/cartSlice";

const NavBar = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const [cartLength, setCartLength] = useState<number>(0);

  const { cartProds, message } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getProductsCart(user?._id));
    }
  }, [user, dispatch, message]);

  useEffect(() => {
    if (cartProds) {
      setCartLength(cartProds.length);
    }
  }, [cartProds]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const { auth } = useAuth();

  return (
    <header className="header">
      <h1>Mercadinho</h1>
      {auth ? (
        <nav>
          <Link to="/">
            <i className="bi bi-house-door-fill"></i>
          </Link>
          <Link to="/cart">
            {cartProds && auth && (
              <div className="circle-cart">{cartLength}</div>
            )}
            <i className="bi bi-cart-fill"></i>
          </Link>
          <Link to="/profile">
            <i className="bi bi-person-circle"></i>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
          </Link>
        </nav>
      ) : (
        <nav>
          <Link to="/">
            <i className="bi bi-house-door-fill"></i>
          </Link>
          <Link to="/login">
            <i className="bi bi-person-circle"></i>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
