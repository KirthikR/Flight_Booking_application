import { Duffel } from '@duffel/api';

const duffel = new Duffel({
  token: process.env.VITE_DUFFEL_API_KEY,
});

export const duffelAPI = {
  // Search for flights
  searchFlights: async (searchParams) => {
    try {
      const { origin, destination, departureDate, returnDate, passengers } = searchParams;
      
      const offerRequest = await duffel.offerRequests.create({
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
          },
          ...(returnDate ? [{
            origin: destination,
            destination: origin,
            departure_date: returnDate,
          }] : []),
        ],
        passengers: [{
          type: 'adult',
          count: passengers
        }],
      });

      const offers = await duffel.offers.list({
        offer_request_id: offerRequest.id,
      });

      return offers.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single offer details
  getOfferDetails: async (offerId) => {
    try {
      const offer = await duffel.offers.get(offerId);
      return offer.data;
    } catch (error) {
      throw error;
    }
  },

  // Create booking
  createBooking: async (offerId, passengerData) => {
    try {
      const booking = await duffel.orders.create({
        selected_offers: [offerId],
        passengers: passengerData,
        payments: [{
          type: 'balance',
          currency: 'USD',
          amount: '100.00' // Amount should be calculated based on offer
        }]
      });
      return booking.data;
    } catch (error) {
      throw error;
    }
  }
};