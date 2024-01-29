import React, { useState } from "react"
import { QRScanner } from "./QRScanner"
import { LogIn } from "./LogIn"
import { DisplayUserMessage } from "./DisplayUserMessage"
import { EditScanModal } from "./EditScanModal"
import { DisplayScans } from "./DisplayScans"
import { SendToSheet } from "./SendToSheet"
import { SentScansList } from "./SentScansList"
import logo from "./Assets/DrylandLogo.png"
import "./App.scss"

export const App = () => {
  const [user, setUser] = useState(null)
  const [userMessage, setUserMessage] = useState("")
  const [scannedData, setScannedData] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [sentScans, setSentScans] = useState([])

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

  const clearScannedData = () => {
    setSentScans([...sentScans, ...scannedData])
    setScannedData([])
  }

  return (
    <main className="App">
      <div className="logo_container">
        <img src={logo} alt="Dry Land Distillery Logo" />
      </div>

      <LogIn
        user={user}
        setUserName={setUserName}
        setUserMessage={setUserMessage}
      />

      {scanning ? (
        <QRScanner
          user={user}
          userMessage={userMessage}
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

      <DisplayUserMessage
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />

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

      <SendToSheet
        scannedData={scannedData}
        setUserMessage={setUserMessage}
        clearScannedData={clearScannedData}
      />
      <SentScansList sentScans={sentScans} />
    </main>
  )
}
// added hyphens aas valid scan character √
// login > scan > prompt edit quantity > save > display removable list items > re-scan... > submit

// added matt √
// changed target sheet √
// make quantity editable √
// deny camera error loop √
// add no access error handling √
// sent scans stored in new array √
// make sure multiple scans display √
// need cancel edit quantity button √
// remove scanned data on sendToSheet √
// space bar causing invalid qr error √
