import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BasicMap = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([17.385044, 78.486671], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default BasicMap;
