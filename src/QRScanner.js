import React, { useState } from "react"
import QrReader from "react-qr-scanner"
import { SendToSheet } from "./SendToSheet"
import { convertTimeStamp } from "./timestampConverter"
import xButton from "./Assets/close.png"
import "./App.css"

export const QRScanner = ({ user }) => {
  const [userMessage, setUserMessage] = useState(null)
  const [qrReaderKey, setQrReaderKey] = useState(0)
  const [allScans, setAllScans] = useState([])

  const handleScan = (data) => {
    console.log("scanning")
    if (data) {
      const currentTimeStamp = convertTimeStamp(data.timestamp)
      parseScanData(data.text, currentTimeStamp)
    }
  }

  const handleError = (err) => {
    displayMessage("Scan Error: ", err)
  }

  const parseScanData = (data, timeStamp) => {
    // Assuming a format of "Product|Batch|Bottle Size|Quantity"
    const parts = data.split("|")
    console.log("scanned", parts)

    if (parts.length === 4) {
      const [product, batch, bottleSize, quantity] = parts
      const scanData = [timeStamp, product, batch, bottleSize, quantity, user]

      // Check if the scan already exists in allScans
      const isDuplicate = allScans.some(
        (scan) =>
          scan[1] === product &&
          scan[2] === batch &&
          scan[3] === bottleSize &&
          scan[4] === quantity
      )

      if (!isDuplicate) {
        setAllScans((prevScans) => [...prevScans, scanData])
      } else {
        handleError("Duplicate scan detected!")
      }
    } else {
      handleError("Invalid QR code data format!")
    }
  }

  const displayMessage = (message) => {
    setUserMessage(message)
    setTimeout(() => {
      setUserMessage("")
    }, 3000)
  }

  const saveAllScans = () => {
    SendToSheet(allScans)
    setAllScans([])
    setQrReaderKey((prevKey) => prevKey + 1)
    displayMessage("Data sent successfully!")
  }

  const removeItem = (index) => {
    const updatedScans = [...allScans]
    updatedScans.splice(index, 1)
    setAllScans(updatedScans)
  }

  const displayScannedData = () => {
    return allScans.map((scan, index) => (
      <span className="scan-display" key={index}>
        {scan[1]} {scan[2]} {scan[3]} {scan[4]}{" "}
        <button
          className="remove-item-button"
          onClick={() => removeItem(index)}
        >
          <img src={xButton} alt="remove from list" />
        </button>
      </span>
    ))
  }

  return (
    <main className="center">
      <div className="scanner-window">
        <div className="qr-scanner-container">
          <QrReader
            key={qrReaderKey}
            constraints={{ video: { facingMode: "environment" } }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </div>
      {displayScannedData()}
      {allScans && (
        <div>
          <p></p>
          <button type="button" onClick={(event) => saveAllScans(event)}>
            SAVE
          </button>
        </div>
      )}
      {userMessage && (
        <div>
          <p>{userMessage}</p>
        </div>
      )}
    </main>
  )
}
