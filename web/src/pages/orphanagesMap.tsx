import React, { useEffect, useState } from "react";
import "../styles/pages/orphanages-map.css";

import mapMarkerImg from "../images/map-marker.svg";

import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanages {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  useEffect(() => {
    api
      .get("orphanages", {
        headers: { authorization: window.localStorage.getItem("token") },
      })
      .then((res) => {
        setOrphanages(res.data);
      });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Marcador Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita: </p>
        </header>

        <footer>
          <strong>Uberlândia</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map
        center={[-18.9206681, -48.2653322]}
        zoom={12.75}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`} className="">
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
export default OrphanagesMap;
