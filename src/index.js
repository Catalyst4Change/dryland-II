import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8TklvBuvnlTGAo-inavE6lhxq1NSfOEo",
  authDomain: "dryland-database-4ece8.firebaseapp.com",
  projectId: "dryland-database-4ece8",
  storageBucket: "dryland-database-4ece8.appspot.com",
  messagingSenderId: "493765745034",
  appId: "1:493765745034:web:7d9ebbd16c90b3abe6d073",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const root = createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
