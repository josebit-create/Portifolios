import "./Auth.css";

import { Link } from "react-router-dom";

import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";

import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="register">
      <h2>Crie sua conta para continuar as compras!</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Insira seu nome aqui..."
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <label>E-mail:</label>
        <input
          type="text"
          placeholder="Insira seu e-mail aqui..."
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <label>Senha:</label>
        <input
          type="password"
          placeholder="Insira sua senha aqui..."
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <label>Confirme sua senha:</label>
        <input
          type="password"
          placeholder="Insira sua senha novamente aqui..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && (
          <button type="submit" className="btn">
            Cadastrar
          </button>
        )}
        {loading && (
          <button disabled type="submit" className="btn">
            Aguarde...
          </button>
        )}
        {error && <div className="error_message">{error}</div>}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
