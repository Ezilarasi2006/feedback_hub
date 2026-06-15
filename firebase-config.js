// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSX-OZDS169khNRVOQntT2v6Vnm0OBjYM",
  authDomain: "feedback-hub-10ca2.firebaseapp.com",
  projectId: "feedback-hub-10ca2",
  storageBucket: "feedback-hub-10ca2.firebasestorage.app",
  messagingSenderId: "951748989262",
  appId: "1:951748989262:web:31fc993bf0f9ce3d4a0e1f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);