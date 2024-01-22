import React, { useState } from "react"
import { SendToSheet } from "./SendToSheet"
import xButton from "./Assets/close.png"
import { convertTimeStamp } from "./timestampConverter"
import "./App.css"

const QrReader = React.lazy(() => import("react-qr-scanner"))

export const QRScanner = ({ user }) => {
  const [userMessage, setUserMessage] = useState(null)
  const [qrReaderKey, setQrReaderKey] = useState(0)
  const [allScans, setAllScans] = useState([])
  const [validScan, setValidScan] = useState(false)
  const [scanning, setScanning] = useState(true)
  const validQRCodePattern = /^[A-Za-z0-9]+\|[A-Za-z0-9]+\|[0-9]+\|[0-9]+$/

  const handleScan = (data) => {
    console.log("scanning")
    if (data) {
      const currentTimeStamp = convertTimeStamp(data.timestamp)
      parseScanData(data.text, currentTimeStamp)
      updateScannerKey()
    }
  }

  const scannerBorderFlashGreen = () => {
    setValidScan(true)
    setTimeout(() => {
      setValidScan(false)
    }, 1000)
  }

  const handleScanError = (err) => {
    displayMessage("Scan Error: ", err)
  }

  const parseScanData = (data, timeStamp) => {
    // Assuming a format of "Product|Batch|Bottle Size|Quantity"
    const parts = data.split("|")

    if (validQRCodePattern) {
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
        scannerBorderFlashGreen()
      } else {
        handleScanError("Duplicate scan detected!")
      }
    } else {
      handleScanError("Invalid QR code data format!")
    }
  }

  const displayMessage = (message) => {
    setUserMessage(message)
    setTimeout(() => {
      setUserMessage("")
    }, 3000)
  }

  const saveAllScans = () => {
    setScanning(false)
    setQrReaderKey((prevKey) => prevKey + 1)
  }

  const removeItem = (index) => {
    const updatedScans = [...allScans]
    updatedScans.splice(index, 1)
    setAllScans(updatedScans)
  }

  const updateScannerKey = () => {
    // renews scanner key to refresh dom and avoid scanner quit
    setQrReaderKey((prevKey) => prevKey + 1)
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
      {scanning ? (
        <div className={`scanner-window ${validScan ? "green" : ""}`}>
          <div className="qr-scanner-container">
            <QrReader
              key={qrReaderKey}
              delay={1000}
              constraints={{ video: { facingMode: "environment" } }}
              onError={() => handleScanError(error)}
              onScan={handleScan}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {displayScannedData()}
      {allScans.length > 0 && scanning ? (
        <div>
          <button type="button" onClick={(event) => saveAllScans(event)}>
            Done Scanning
          </button>
        </div>
      ) : (
        <></>
      )}
      {userMessage && (
        <div>
          <p>{userMessage}</p>
        </div>
      )}
      {!scanning ? <SendToSheet allScans={allScans} /> : <></>}
    </main>
  )
}
