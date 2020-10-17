import React from "react";
import { Link } from "react-router-dom";
import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/sidebar.css";

export default function SidebarSpecial() {
  return (
    <aside className="app-sidebar">
      <Link to="/login">
        <img src={mapMarkerImg} alt="Happy" />
      </Link>
    </aside>
  );
}
