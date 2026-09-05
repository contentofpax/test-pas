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

// UI convenience only, NOT a security boundary — real staff access is enforced
// by firestore.rules / storage.rules. Keep this list identical to the phone
// numbers in those two files' isStaff() functions.
export const STAFF_PHONES = ['+917869196341'];

export const CAFE_LAT = 15.0422837;
export const CAFE_LNG = 73.9883789;
export const CAFE_RADIUS_METERS = 300;
export const MIN_REDEEM_CREDITS = 200; // minimum redeemable amount; 1 credit = ₹1, no upper cap beyond balance

export const CREDIT_RULES = {
  google_review: 10,
  instagram_story: 20,
  instagram_post: 50
};
export const BILL_CREDIT_RATE = 0.10; // 10% of bill amount, in credits

export function creditsForProof(proofType, billAmount) {
  if (proofType === 'bill_amount') {
    const amt = Number(billAmount) || 0;
    return Math.round(amt * BILL_CREDIT_RATE);
  }
  return CREDIT_RULES[proofType] || 0;
}

export function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
