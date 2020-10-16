import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/pages/join.css";

function Join() {
  return (
    <div id="page-create-orphanage">
      <Sidebar />
      {/* sidebar especial */}
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Cadastro</legend>

            <div className="input-block">
              <label htmlFor="name">Usuário</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="name">Email</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="name">Senha</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="name">Repetir senha</label>
              <input id="name" />
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
