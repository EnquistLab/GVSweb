import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import React, { useState } from "react";

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
// import * as leaflet from "leaflet";

import world from './countries.geo.json'
// with id from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3

import {
  ChecklistsDialog,
} from "../../components/";

const Map = ({ checklistsByCountry, checklistsInfo, citations }) => {
  const [open, setOpen] = useState(false);
  const [checklistName, setChecklistName] = useState('')

  const handleClickOpen = (checklist) => {
    setChecklistName(checklist)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getColor = (id) => {
    if (id in checklistsByCountry) {
      let length = checklistsByCountry[id].sources.split(',').length
      return length == 1 ? "#D6D58E" :
        length === 2 ? "#005C53" :
          '#042940';
    }
  }

  const geojsonFilter = (geojson) => {
    if (geojson.id in checklistsByCountry) {
      return true
    }
    return false
  }

  const geojsonStyle = (feature) => {
    return {
      "dashArray": '5',
      "color": getColor(feature.id),
      "weight": 2,
      "opacity": 1
    }
  }

  // links are added manually everytime a new popup opens
  const addLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.addEventListener("click", (e) => { handleClickOpen(e.target.innerText) });
      }
    }
  };

  // links are also removed after the popup closes
  const removeLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.removeEventListener("click", (e) => handleClickOpen(e.target.innerText));
      }
    }
  };

  const geojsonFeatures = (feature, layer) => {
    if (checklistsByCountry[feature.id] !== undefined) {
      let links = checklistsByCountry[feature.id].sources
        .split(',')
        .map((s) => '<a href="#" class="popup-button-link">' + s + '</a>')
        .join(', ')

      layer
        .addEventListener('popupopen', addLinks)
        .addEventListener('popupclose', removeLinks)
        .bindPopup(
          '<strong>' + checklistsByCountry[feature.id].country + '</strong><br>'
          + 'Checklists available: '
          + links
        );
    }
  }


  let center = [40.8054, -74.0241]

  return (
    <>
      <ChecklistsDialog
        open={open}
        onClose={handleClose}
        checklistName={checklistName}
        checklistsInfo={checklistsInfo}
        citations={citations}
      />

      <MapContainer
        key={1}
        center={center}
        zoom={4}
        scrollWheelZoom={true}
        // 64px is the size of the top bar
        style={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON filter={geojsonFilter} data={world} onEachFeature={geojsonFeatures} style={geojsonStyle} />
      </MapContainer>
    </>
  )
}

export default Map
