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
      <p>production branch</p>
      <p>client id: catalyst</p>
      <p>target sheet: demo</p>
    </main>
  )
}

// delete item from pre-submission ist
// remove data titles in display
// plan B scan refresh button
// spreadtsheet ID: 1eOjJmq4Ex8TuBQdFbmeUBcaPWRrKqxXgoNax8GnEspA
// add regex detection to ensure flat string input (security)
