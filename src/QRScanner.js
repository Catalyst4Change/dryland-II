import React, { useState } from "react"
import QrReader from "react-qr-scanner"
import { SendToSheet } from "./SendToSheet"
import "./App.css"

export const QRScanner = ({ user }) => {
  const [delay] = useState(100)
  const [timeStamp, setTimeStamp] = useState(null)
  const [scannedProduct, setScannedProduct] = useState(null)
  const [scannedBatch, setScannedBatch] = useState(null)
  const [scannedSize, setScannedSize] = useState(null)
  const [scannedQuantity, setScannedQuantity] = useState(null)

  const handleScan = (data) => {
    if (data) {
      parseScanData(data.text)
      convertTimeStamp(data.timestamp)
    }
  }

  const handleError = (err) => {
    console.error("Scan Error: ", err)
  }

  // Takes timestamp from QRreader data and converts to readable format
  const convertTimeStamp = (timeStamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timeStamp)

    // Format the date
    // Get the day, month, year, hours, and minutes
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0") // +1 because months are 0-indexed
    const year = date.getFullYear().toString().slice(-2) // Get the last two digits of the year
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    // Combine to get the formatted string
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`

    setTimeStamp(formattedDate)
    // Outputs the date in DD/MM/YY HH:MM format
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
      console.error("Invalid QR code data format!")
      return null
    }
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
  }

  return (
    <main>
      <div className="scanner-window">
        <div className="qr-scanner-container">
          <QrReader delay={delay} onError={handleError} onScan={handleScan} />
        </div>
      </div>
      {scannedProduct && (
        <div className="center">
          <p>
            Product: {scannedProduct}, Batch: {scannedBatch}, Size:{" "}
            {scannedSize}, Quantity: {scannedQuantity}
          </p>
          <button onClick={saveScannedData}>SAVE</button>
        </div>
      )}
    </main>
  )
}
