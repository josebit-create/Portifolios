import "./Home.css";

import {
  getProducts,
  getProductsBySection,
  searchProducts,
} from "../../slices/productsSlice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useAuth } from "../../hooks/useAuth";
import IProduct from "../../interfaces/Product";
import { insertProdCart } from "../../slices/cartSlice";
import Message from "../../components/Message";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const Home = () => {
  const [section, setSection] = useState("");
  const [query, setQuery] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const reset = useResetComponentMessage(dispatch);

  const { auth } = useAuth();

  const navigate = useNavigate();

  const { products: prods, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.cart);

  const handleAddProduct = (prod: IProduct) => {
    if (!auth || !user) {
      navigate("/login");
      return;
    }

    const newProdCart = {
      name: prod.name,
      price: Number(parseFloat(prod.price)),
      amount: 1,
      userId: user._id,
    };

    dispatch(insertProdCart(newProdCart));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(query);

    if (!query) return;
    dispatch(searchProducts(query));
  };

  useEffect(() => {
    dispatch(searchProducts(query));
  }, [query]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsBySection(section));
  }, [dispatch, section]);

  useEffect(() => {
    reset();
  }, [message]);

  return (
    <div className="home">
      <div className="nav">
        <form className="search" onSubmit={handleSearch}>
          <i className="bi bi-search"></i>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query || ""}
          />
        </form>
        <div className="sections">
          <select
            id="select_sections"
            onChange={(e) => setSection(e.target.value)}
            value={section || ""}
          >
            <option value="">Selecione uma seção</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Higiene">Higiene</option>
            <option value="Frios">Frios</option>
            <option value="Limpeza">Limpeza</option>
          </select>
        </div>
      </div>
      {!loading && (
        <div className="content">
          {message && <Message message={message} />}
          {prods.length === 0 && !loading ? (
            <p className="message_2">Não há produtos aqui...</p>
          ) : (
            prods &&
            prods.map((prod) => (
              <div key={prod.name} className="product">
                <h3>{prod.name}</h3>
                <p>
                  Preço: <span>R${prod.price}</span>
                </p>
                <p>{prod.description}</p>
                <button onClick={() => handleAddProduct(prod)}>
                  Adicionar <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            ))
          )}
        </div>
      )}
      {loading && <p className="spinner"></p>}
    </div>
  );
};

export default Home;
