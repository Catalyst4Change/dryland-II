import React, { useState } from "react"
import { QRScanner } from "./QRScanner"
import { LogIn } from "./LogIn"
import { DisplayUserMessage } from "./DisplayUserMessage"
import { VerifyScanModal } from "./VerifyScanModal"
import logo from "./Assets/DrylandLogo.png"
import "./App.css"

export const App = () => {
  const [user, setUser] = useState(null)
  const [userMessage, setUserMessage] = useState("")
  const [scannedData, setScannedData] = useState([])
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)

  const setUserName = (userName) => {
    setUser(userName)
  }

  return (
    <main>
      <div className="logo_container">
        <img src={logo} alt="Dryland Distillery Logo" />
      </div>

      <LogIn user={user} setUserName={setUserName} />

      <DisplayUserMessage
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />

      <QRScanner
        user={user}
        setUserMessage={setUserMessage}
        scannedData={scannedData}
        setScannedData={setScannedData}
        setVerifyModalOpen={setVerifyModalOpen}
      />

      {/* verify data and quantity (modal) */}

      <VerifyScanModal
        verifyModalOpen={verifyModalOpen}
        setVerifyModalOpen={setVerifyModalOpen}
        scannedData={scannedData[scannedData.length - 1]}
        setScannedData={setScannedData}
      />

      {/* send verified data to sheet */}

      <p>branch: multiscan</p>
      <p>client id: dry land</p>
      <p>target sheet: dry land batch scan log</p>
    </main>
  )
}
// add no access error handling √
// add reload prompt if scanning stops
// make quantity editable
// confirm scans before submission
// login > scan > prompt edit quantity > save > re-scan... > submit

// added matt
// changed target sheet
