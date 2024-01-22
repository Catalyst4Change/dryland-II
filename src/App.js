import React, { useState } from "react"
import { QRScanner } from "./QRScanner"
import { LogIn } from "./LogIn"
import logo from "./Assets/DrylandLogo.png"
import "./App.css"

export const App = () => {
  const [user, setUser] = useState(null)

  const setUserName = (userName) => {
    setUser(userName)
  }

  return (
    <main>
      <div className="logo_container">
        <img src={logo} alt="Dryland Distillery Logo" />
      </div>
      <LogIn user={user} setUserName={setUserName} />
      {user && <QRScanner user={user} />}
      <p>branch: multiscan</p>
      <p>client id: dry land</p>
      <p>target sheet: dry land batch scan log</p>
    </main>
  )
}
// add no access error handling
// add reload prompt if scanning stops
// make quantity editable
// confirm scans before submission
// scan > prompt edit quantity > save > re-scan > submit

// added matt
// changed target sheet
