import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiM4L6-3W-ZJbOo9repoRyECEf5alV6ts",
  authDomain: "wanderwise-firebase-v1.firebaseapp.com",
  projectId: "wanderwise-firebase-v1",
  storageBucket: "wanderwise-firebase-v1.firebasestorage.app",
  messagingSenderId: "78087268573",
  appId: "1:78087268573:web:139bc60cf3089fa68ad334",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);