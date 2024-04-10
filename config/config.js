//dotenv securely and secretly holds sensitive environment variables like API keys (firebase etc.)
require("dotenv").config();

const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };

const gmailConfig = {
      service : 'gmail',
      auth : {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
      }
}

function getRGeocodeAPI (lat,lng) {
      return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
//const googleMapsRGCodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${process.env.GOOGLE_MAPS_API_KEY}`;


module.exports = {
      firebaseConfig,
      gmailConfig,
      getRGeocodeAPI,
};