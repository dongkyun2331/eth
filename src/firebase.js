import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxoZSe-fFozEZowhpfZwdtxCjStkJ8l3M",
  authDomain: "eth-pori.firebaseapp.com",
  projectId: "eth-pori",
  storageBucket: "eth-pori.appspot.com",
  messagingSenderId: "120376394663",
  appId: "1:120376394663:web:afe34a9535a7eda653ac82",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
