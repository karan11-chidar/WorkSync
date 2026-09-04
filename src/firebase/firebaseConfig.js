// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase project settings loaded from Vite environment variables.
 * The initialized Firestore database and Authentication services are
 * exported below for use throughout the application.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID,

  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// --------------------------------------------------
// Initialize Firebase
// --------------------------------------------------

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// --------------------------------------------------
// Secondary Firebase App
// --------------------------------------------------
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");

// Secondary Auth
export const secondaryAuth = getAuth(secondaryApp);

