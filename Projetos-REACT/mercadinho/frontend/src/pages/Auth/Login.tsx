import "./Auth.css";
import { Link } from "react-router-dom";

import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login, reset } from "../../slices/authSlice";
import { AppDispatch, RootState } from "../../store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="login">
      <h2>Entre em sua conta para continuar as compras!</h2>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input
          type="text"
          placeholder="Insira seu e-mail aqui..."
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <label>Senha</label>
        <input
          type="password"
          placeholder="Insira sua senha aqui..."
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <button type="submit">Entrar</button>}
        {loading && (
          <button type="submit" disabled>
            Aguarde...
          </button>
        )}
        {error && <div className="error_message">{error}</div>}
      </form>
      <p>
        Ainda não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
