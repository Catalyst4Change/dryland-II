import React, { useState } from "react"
import QrReader from "react-qr-scanner"
import { SendToSheet } from "./SendToSheet"
import { convertTimeStamp } from "./timestampConverter"
import "./App.css"

export const QRScanner = ({ user }) => {
  const [timeStamp, setTimeStamp] = useState(null)
  const [scannedProduct, setScannedProduct] = useState(null)
  const [scannedBatch, setScannedBatch] = useState(null)
  const [scannedSize, setScannedSize] = useState(null)
  const [scannedQuantity, setScannedQuantity] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const [qrReaderKey, setQrReaderKey] = useState(0)

  const handleScan = (data) => {
    console.log("scanning")
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
    console.log("scanned", data)

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
      setUserMessage("")
    }, 3000)
  }

  const clearScanData = () => {
    setScannedProduct(null)
    setScannedBatch(null)
    setScannedSize(null)
    setScannedQuantity(null)
    displayMessage("Data sent successfully!")
    setQrReaderKey((prevKey) => prevKey + 1)
    console.log(qrReaderKey)
  }

  const saveScannedData = (event) => {
    event.preventDefault()
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
            key={qrReaderKey}
            constraints={{ video: { facingMode: "environment" } }}
            delay="1000"
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
          <button type="button" onClick={(event) => saveScannedData(event)}>
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
