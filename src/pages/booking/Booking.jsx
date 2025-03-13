import React, { useState } from 'react';
import styles from './Booking.module.css';
import { FaPlane, FaExchangeAlt, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import PassengerModal from '../../components/PassengerModal';

export default function Booking() {
  const [tripType, setTripType] = useState('roundTrip');
  const [flights, setFlights] = useState([
    {
      origin: '',
      destination: '',
      departDate: '',
      returnDate: '',
      includeNearby: false
    }
  ]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [cabinClass, setCabinClass] = useState('economy');
  const [directOnly, setDirectOnly] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  const cabinClasses = {
    economy: 'Economy',
    premiumEconomy: 'Premium Economy',
    business: 'Business',
    first: 'First Class'
  };

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.tripTypeSelector}>
        <button 
          className={`${styles.tripTypeBtn} ${tripType === 'roundTrip' ? styles.active : ''}`}
          onClick={() => setTripType('roundTrip')}
        >
          Round Trip
        </button>
        <button 
          className={`${styles.tripTypeBtn} ${tripType === 'oneWay' ? styles.active : ''}`}
          onClick={() => setTripType('oneWay')}
        >
          One Way
        </button>
        <button 
          className={`${styles.tripTypeBtn} ${tripType === 'multiCity' ? styles.active : ''}`}
          onClick={() => setTripType('multiCity')}
        >
          Multi-City
        </button>
      </div>

      <form className={styles.searchForm}>
        <div className={styles.mainFlightDetails}>
          <div className={styles.locationGroup}>
            <div className={styles.inputGroup}>
              <label>From</label>
              <div className={styles.inputWithIcon}>
                <FaPlane className={styles.inputIcon} />
                <input 
                  type="text"
                  placeholder="City or Airport"
                  value={flights[0].origin}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[0].origin = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </div>
              <div className={styles.checkbox}>
                <input 
                  type="checkbox"
                  id="nearbyOrigin"
                  checked={flights[0].includeNearby}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[0].includeNearby = e.target.checked;
                    setFlights(newFlights);
                  }}
                />
                <label htmlFor="nearbyOrigin">Add nearby airports</label>
              </div>
            </div>

            <button type="button" className={styles.exchangeBtn}>
              <FaExchangeAlt />
            </button>

            <div className={styles.inputGroup}>
              <label>To</label>
              <div className={styles.inputWithIcon}>
                <FaPlane className={styles.inputIcon} />
                <input 
                  type="text"
                  placeholder="City or Airport"
                  value={flights[0].destination}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[0].destination = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.dateGroup}>
            <div className={styles.inputGroup}>
              <label>Depart</label>
              <div className={styles.inputWithIcon}>
                <FaCalendarAlt className={styles.inputIcon} />
                <input 
                  type="date"
                  value={flights[0].departDate}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[0].departDate = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </div>
            </div>

            {tripType === 'roundTrip' && (
              <div className={styles.inputGroup}>
                <label>Return</label>
                <div className={styles.inputWithIcon}>
                  <FaCalendarAlt className={styles.inputIcon} />
                  <input 
                    type="date"
                    value={flights[0].returnDate}
                    onChange={(e) => {
                      const newFlights = [...flights];
                      newFlights[0].returnDate = e.target.value;
                      setFlights(newFlights);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.passengerGroup}>
            <button 
              type="button" 
              className={styles.passengerSelector}
              onClick={() => setShowPassengerModal(!showPassengerModal)}
            >
              <FaUserFriends className={styles.inputIcon} />
              <span>
                {passengers.adults + passengers.children + passengers.infants} Traveller(s),
                {cabinClasses[cabinClass]}
              </span>
            </button>

            {showPassengerModal && (
              <PassengerModal
                isOpen={showPassengerModal}
                onClose={() => setShowPassengerModal(false)}
                passengers={passengers}
                setPassengers={setPassengers}
                cabinClass={cabinClass}
                setCabinClass={setCabinClass}
              />
            )}
          </div>
        </div>

        <div className={styles.additionalOptions}>
          <label className={styles.checkbox}>
            <input 
              type="checkbox"
              checked={directOnly}
              onChange={(e) => setDirectOnly(e.target.checked)}
            />
            Direct flights only
          </label>
        </div>

        <button type="submit" className={styles.searchButton}>
          Search Flights
        </button>
      </form>
    </div>
  );
}