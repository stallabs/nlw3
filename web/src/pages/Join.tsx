import React, { FormEvent, useState } from "react";
import SidebarSpecial from "../components/SidebarSpecial";
import "../styles/pages/join.css";
import { useHistory } from "react-router-dom";
import api from "../services/api";

function Join() {
  const history = useHistory();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append("user", user);
    data.append("email", email);
    data.append("password", password);

    await api.post("users", data);

    alert("Usuario cadastrado com sucesso");
    history.push("/login");
  }

  return (
    <div id="page-create-orphanage">
      <SidebarSpecial />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Cadastro</legend>

            <div className="input-block">
              <label htmlFor="user">
                Usuário <span>Máximo de 10 caracteres</span>
              </label>
              <input
                id="user"
                maxLength={10}
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </div>

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
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="confirm-password">Repetir senha</label>
              <input id="confirm-password" />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}
export default Join;
