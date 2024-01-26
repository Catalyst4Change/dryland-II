import React, { useState } from "react"
import { convertTimeStamp } from "./timestampConverter"
import "./App.css"

const QrReader = React.lazy(() => import("react-qr-scanner"))

export const QRScanner = ({
  user,
  setUserMessage,
  scannedData,
  setScannedData,
  setEditIndex,
  setVerifyModalOpen,
  setScanning,
}) => {
  const [qrReaderKey, setQrReaderKey] = useState(0)
  // const [validScan, setValidScan] = useState(false)

  const validQRCodePattern = /^[A-Za-z0-9]+\|[A-Za-z0-9]+\|[0-9]+\|[0-9]+$/

  const handleScan = (data) => {
    console.log("scanning")
    if (data) {
      const currentTimeStamp = convertTimeStamp(data.timestamp)
      parseScanData(data.text, currentTimeStamp)
      updateScannerKey()
    }
  }

  const handleScanError = (err) => {
    setUserMessage("Scan Error: " + err)
  }

  const parseScanData = (data, timeStamp) => {
    // Assuming a format of "Product|Batch|Bottle Size|Quantity"
    const parts = data.split("|")

    if (validQRCodePattern) {
      const [product, batch, bottleSize, quantity] = parts
      const scanData = [timeStamp, product, batch, bottleSize, quantity, user]

      // Check if the scan already exists in allScans
      const isDuplicate = scannedData.some(
        (scan) =>
          scan[1] === product &&
          scan[2] === batch &&
          scan[3] === bottleSize &&
          scan[4] === quantity
      )

      if (!isDuplicate) {
        setScannedData((prevScans) => [...prevScans, scanData])
        setScanning(false)
        setVerifyModalOpen(true)
        setEditIndex(scannedData.length - 1)
      } else {
        handleScanError("Duplicate scan detected!")
      }
    } else {
      handleScanError("Invalid QR code data format!")
    }
  }

  // Renews scanner key to refresh dom and avoid scanner quit
  const updateScannerKey = () => {
    setQrReaderKey((prevKey) => prevKey + 1)
  }

  return (
    <main className="center">
      <div className={"scanner-window "}>
        <div className="qr-scanner-container">
          <QrReader
            key={qrReaderKey}
            delay={1000}
            constraints={{ video: { facingMode: "environment" } }}
            onError={(error) => handleScanError(error)}
            onScan={handleScan}
          />
        </div>
      </div>
    </main>
  )
}
