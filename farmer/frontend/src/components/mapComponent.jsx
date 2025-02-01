import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './mapComponent.css';

export default function MapComponent() {
    const mapRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]); // To store recorded coordinates
    const [isTracking, setIsTracking] = useState(false); // Tracking status
    const trackingIntervalRef = useRef(null); // To manage interval

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            if (!mapRef.current) {
                mapRef.current = L.map("map").setView([latitude, longitude], 18);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 20,
                }).addTo(mapRef.current);

                L.marker([latitude, longitude]).addTo(mapRef.current)
                    .bindPopup("You are here")
                    .openPopup();
            }
        });
    }, []);

    // Function to start tracking
    const startTracking = () => {
        setIsTracking(true);
        trackingIntervalRef.current = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                // Store the new coordinate
                setCoordinates((prevCoords) => [...prevCoords, { latitude, longitude }]);

                // Add a small marker for each recorded point
                L.circleMarker([latitude, longitude], {
                    radius: 4,
                    color: "red",
                }).addTo(mapRef.current);
            });
        }, 3000); // Every 3 seconds
    };

    // Function to stop tracking
    const stopTracking = () => {
        setIsTracking(false);
        clearInterval(trackingIntervalRef.current);
    };

    return (
        <div>
            <div id="map" style={{ height: "500px", width: "100%" }}></div>

            <div style={{ marginTop: "10px" }}>
                {!isTracking ? (
                    <button onClick={startTracking} className="track-btn">Start Tracking</button>
                ) : (
                    <button onClick={stopTracking} className="stop-btn">Stop Tracking</button>
                )}
            </div>

            {/* Display recorded coordinates */}
            <div className="coordinates-list">
                <h4>Recorded Coordinates:</h4>
                <ul>
                    {coordinates.map((coord, index) => (
                        <li key={index}>
                            {coord.latitude.toFixed(6)}, {coord.longitude.toFixed(6)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
