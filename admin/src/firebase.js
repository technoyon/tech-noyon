// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAOdwUB83quL-T3gLWmshmM7-FUG4hONiA",
//   authDomain: "reacthasib.firebaseapp.com",
//   projectId: "reacthasib",
//   storageBucket: "reacthasib.firebasestorage.app",
//   messagingSenderId: "62525725315",
//   appId: "1:62525725315:web:0752ba32eaa4ee56ffd9b6",
//   measurementId: "G-3EVK9SPHLQ"
// };


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJdoStu86GdW8PST3Xgl2YRhj0m_xjtTc",
  authDomain: "tech-noyon.firebaseapp.com",
  projectId: "tech-noyon",
  storageBucket: "tech-noyon.firebasestorage.app",
  messagingSenderId: "225321621646",
  appId: "1:225321621646:web:9cc23ecf132b58df7f91df"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Optional analytics (guarded for environments where it is not supported)
isSupported()
  .then((yes) => {
    if (yes) getAnalytics(app);
  })
  .catch(() => {});