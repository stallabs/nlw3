import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/sidebar.css";

export default function Sidebar() {
  const { goBack } = useHistory();
  return (
    <aside className="app-sidebar">
      <Link to="/app">
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      {/* <div className="user-name">name_here</div> */}
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
