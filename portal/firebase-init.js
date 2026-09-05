import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9gcUH2_eEcVPEyfkKmKHOFlTJIXnTIKk",
  authDomain: "pas-specialty-coffee.firebaseapp.com",
  projectId: "pas-specialty-coffee",
  storageBucket: "pas-specialty-coffee.firebasestorage.app",
  messagingSenderId: "1019385155949",
  appId: "1:1019385155949:web:b2b46684214403a79c4a64"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const CAFE_LAT = 15.0422837;
export const CAFE_LNG = 73.9883789;
export const CAFE_RADIUS_METERS = 300;
export const REDEEM_COST = 50;

export function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
