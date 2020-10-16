import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/pages/login.css";

function Login() {
  return (
    <div id="page-login">
      <Sidebar />
      {/* sidebar especial */}
      <main>
        <form className="create-login-form">
          <fieldset>
            <legend>Entrar</legend>

            <div className="input-block">
              <label htmlFor="name">Email</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="name">Senha</label>
              <input id="name" />
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
