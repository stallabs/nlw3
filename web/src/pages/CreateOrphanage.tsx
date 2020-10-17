import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/Sidebar";
import { FiPlus } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  // conveçao bonitinha
  const [opening_hoursEnd, setOpeningHoursEnd] = useState("");
  const [opening_hoursStart, setOpeningHoursStart] = useState("");

  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }
  var erroControle = 0;
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);

    // controle de erro coordenadas
    latitude !== 0
      ? data.append("latitude", String(latitude))
      : (erroControle = 1);

    longitude !== 0
      ? data.append("longitude", String(longitude))
      : (erroControle = 1);

    data.append("instructions", instructions);

    if (opening_hoursStart > opening_hoursEnd) {
      data.append(
        "opening_hours",
        `Das ${opening_hoursEnd}h às ${opening_hoursStart}h`
      );
    } else {
      data.append(
        "opening_hours",
        `Das ${opening_hoursStart}h às ${opening_hoursEnd}h`
      );
    }

    data.append("open_on_weekends", String(open_on_weekends));

    if (images === [] || images.length === 0) {
      erroControle = 2;
    } else {
      images.forEach((image) => {
        data.append("images", image);
      });
    }

    await api.post("orphanages", data, {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    if (erroControle === 0) {
      alert("Cadastro do orfanato realizado com sucesso");
      history.push("/app");
    } else if (erroControle === 1) {
      alert("Por favor infrome a localização");
    } else if (erroControle === 2) {
      alert("Insira ao menos uma imagem");
    }
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-18.9206681, -48.2653322]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker
                  required
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                required
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                required
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={name} src={image} alt={name} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImage}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                required
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <div className="input-time">
                <label> Das</label>
                <input
                  type="number"
                  id="opening_hoursStart"
                  min="0"
                  max="23"
                  value={opening_hoursStart}
                  onChange={(event) => setOpeningHoursStart(event.target.value)}
                />{" "}
                <label> às</label>
                <input
                  type="number"
                  id="opening_hoursEnd"
                  min="0"
                  max="23"
                  value={opening_hoursEnd}
                  onChange={(event) => setOpeningHoursEnd(event.target.value)}
                />
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
