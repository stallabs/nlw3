import React, { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SidebarSpecial from "../components/SidebarSpecial";
import api from "../services/api";
import "../styles/pages/login.css";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    //console.log({ email, password });
    const data = { email, password };

    const resposta = await api.post("auth", data);
    if (resposta == null) alert("Email ou senha incorretos");

    localStorage.setItem("token", resposta.data?.token);

    history.push("/app");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/app");
    }
  }, [history]);

  return (
    <div id="page-login">
      <SidebarSpecial />
      <main>
        <form onSubmit={handleSubmit} className="create-login-form">
          <fieldset>
            <legend>Entrar</legend>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>
          <div
            className="input-block"
            style={{ color: "#36cf82", marginTop: "20px" }}
          >
            <label>
              Ainda não possui uma conta?
              <Link
                to="/join"
                style={{
                  color: "#36cf82",
                  marginLeft: "10px",
                  textDecoration: "none",
                }}
              >
                Cadastrar
              </Link>
            </label>
          </div>

          <button className="confirm-button" type="submit">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
export default Login;
