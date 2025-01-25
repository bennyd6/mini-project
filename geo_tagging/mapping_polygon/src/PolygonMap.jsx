import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const PolygonMap = () => {
  useEffect(() => {
    // Check if the map already exists and destroy it
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    // Initialize the map
    const map = L.map('map').setView([17.385044, 78.486671], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Hardcoded GPS coordinates for the farmer's land
    const polygonCoordinates = [
      [17.385044, 78.486671],
      [17.385144, 78.487671],
      [17.384144, 78.487271],
      [17.384044, 78.486471],
    ];

    // Mock NDVI threshold value (for simplicity)
    const mockNDVIValue = 0.45;  // This should come from actual NDVI calculation

    // Determine whether the land is cultivated based on NDVI value
    const isCultivated = mockNDVIValue > 0.3 ? 'Yes' : 'No'; // Example threshold for cultivation

    // Create the polygon with a tooltip displaying cultivation status
    const polygon = L.polygon(polygonCoordinates, {
      color: 'green',
      fillColor: '#70db70',
      fillOpacity: 0.5,
    })
      .bindTooltip(`Cultivated: ${isCultivated}`, {
        permanent: true,
        direction: 'top',
      })
      .addTo(map);

    // Adjust the map view to fit the polygon bounds
    map.fitBounds(polygon.getBounds());

    // Cleanup function to remove the map instance
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default PolygonMap;
