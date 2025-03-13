import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/App.module.css";

export default function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.post("https://api.duffel.com/air/offer_requests", {
          slices: [
            {
              origin: "LHR", // Replace with your origin
              destination: "JFK", // Replace with your destination
              departure_date: "2025-03-10" // Replace with your departure date
            }
          ],
          passengers: [{ type: "adult" }],
          cabin_class: "economy"
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_DUFFEL_API_KEY}`,
            "Duffel-Version": "v1"
          }
        });
        console.log("API response:", response.data);
        setFlights(response.data.data.offers);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Available Flights Here You Go</h1>
      {flights.length === 0 ? <p>Loading flights...</p> : (
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              <strong>{flight.owner.name}</strong> - {flight.total_amount} {flight.total_currency}
              <p>{flight.slices.map(slice => `${slice.origin.iata_code} to ${slice.destination.iata_code}`).join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}