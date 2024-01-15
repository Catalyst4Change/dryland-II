import React, { useState } from "react"
import QrReader from "react-qr-scanner"
import { SendToSheet } from "./SendToSheet"
import { convertTimeStamp } from "./timestampConverter"
import "./App.css"

export const QRScanner = ({ user }) => {
  const [delay] = useState(500)
  const [timeStamp, setTimeStamp] = useState(null)
  const [scannedProduct, setScannedProduct] = useState(null)
  const [scannedBatch, setScannedBatch] = useState(null)
  const [scannedSize, setScannedSize] = useState(null)
  const [scannedQuantity, setScannedQuantity] = useState(null)
  const [userMessage, setUserMessage] = useState(null)

  const handleScan = (data) => {
    if (data) {
      parseScanData(data.text)
      setTimeStamp(convertTimeStamp(data.timestamp))
    }
  }

  const handleError = (err) => {
    displayMessage("Scan Error: ", err)
  }

  const parseScanData = (data) => {
    // Assuming a format of "Product|Batch|Bottle Size|Quantity"
    const parts = data.split("|")

    if (parts.length === 4) {
      const [product, batch, bottleSize, quantity] = parts
      setScannedProduct(product)
      setScannedBatch(batch)
      setScannedSize(bottleSize)
      setScannedQuantity(quantity)
    } else {
      // Handle invalid QR code data format
      handleError("Invalid QR code data format!")
      return null
    }
  }

  const displayMessage = (message) => {
    setUserMessage(message)
    setTimeout(() => {
      setUserMessage(null)
    }, 3000)
  }

  const clearScanData = () => {
    setScannedProduct(null)
    setScannedBatch(null)
    setScannedSize(null)
    setScannedQuantity(null)
    displayMessage("Data sent successfully!")
  }

  const saveScannedData = () => {
    SendToSheet(
      scannedProduct,
      scannedBatch,
      scannedSize,
      scannedQuantity,
      timeStamp,
      user
    )
    clearScanData()
  }

  return (
    <main className="center">
      <div className="scanner-window">
        <div className="qr-scanner-container">
          <QrReader
            constraints={{ video: { facingMode: "environment" } }}
            delay={delay}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </div>
      {scannedProduct && (
        <div>
          <p>
            Product: {scannedProduct}, Batch: {scannedBatch}, Size:{" "}
            {scannedSize}, Quantity: {scannedQuantity}
          </p>
          <button type="button" onClick={saveScannedData}>
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
