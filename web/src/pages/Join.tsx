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
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log({ email, password, user });
    const data = { email, password };

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
                required
                id="user"
                maxLength={10}
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="email">
                Email
                <span>
                  {email !== "" && email.indexOf("@") === -1 ? (
                    <div style={{ color: "#ff0000" }}>Email Invalido</div>
                  ) : (
                    ""
                  )}
                </span>
              </label>
              <input
                required
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="confirm-password">
                Repetir senha
                <span>
                  {password !== "" &&
                  confirmPassword !== "" &&
                  password !== confirmPassword ? (
                    <div style={{ color: "#ff0000" }}>Senhas diferentes</div>
                  ) : (
                    ""
                  )}
                </span>
              </label>
              <input
                required
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
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
