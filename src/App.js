import React, { useState } from "react"
import { QRScanner } from "./QRScanner"
import { LogIn } from "./LogIn"
import { DisplayUserMessage } from "./DisplayUserMessage"
import { EditScanModal } from "./EditScanModal"
import { DisplayScans } from "./DisplayScans"
import logo from "./Assets/DrylandLogo.png"
import "./App.css"

export const App = () => {
  const [user, setUser] = useState(null)
  const [userMessage, setUserMessage] = useState("")
  const [scannedData, setScannedData] = useState([
    ["01/25/24, 12:20", "1", "2", "3", "4", "Catalyst"],
    ["01/26/24, 12:20", "1", "2", "3", "4", "Catalyst"],
  ])
  const [editIndex, setEditIndex] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [scanning, setScanning] = useState(false)

  const toggleEditModal = () => {
    setEditModalOpen((editModalOpen) => !editModalOpen)
  }

  const setUserName = (userName) => {
    setUser(userName)
    setScanning(true)
  }

  const changeEditIndex = (target) => {
    setEditIndex(target)
  }

  return (
    <main>
      <h1 className="center">Dry Land Batch Scanner</h1>
      <div className="logo_container">
        <img src={logo} alt="Dry Land Distillery Logo" />
      </div>

      <LogIn user={user} setUserName={setUserName} />

      <DisplayUserMessage
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />

      {scanning ? (
        <QRScanner
          user={user}
          setUserMessage={setUserMessage}
          scannedData={scannedData}
          setScannedData={setScannedData}
          setEditIndex={setEditIndex}
          toggleEditModal={toggleEditModal}
          setScanning={setScanning}
        />
      ) : (
        <></>
      )}

      <DisplayScans
        scannedData={scannedData}
        setScannedData={setScannedData}
        changeEditIndex={changeEditIndex}
        toggleEditModal={toggleEditModal}
      />

      {/* edit data and quantity (modal) */}

      <EditScanModal
        editModalOpen={editModalOpen}
        toggleEditModal={toggleEditModal}
        scannedData={scannedData}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setScannedData={setScannedData}
        setScanning={setScanning}
      />

      {/* send verified data to sheet */}

      <p>branch: multiscan</p>
      <p>client id: dry land</p>
      <p>target sheet: dry land batch scan log</p>
    </main>
  )
}
// confirm scans before submission
// make sure multiple scans display
// login > scan > prompt edit quantity > save > display removable list items > re-scan... > submit

// added matt √
// changed target sheet √
// make quantity editable √
// add no access error handling √

// add reload prompt if scanning stops X
