import React, { useEffect, useState } from "react"
import { convertTimeStamp } from "./timestampConverter"
import "./App.css"

const QrReader = React.lazy(() => import("react-qr-scanner"))

export const QRScanner = ({
  user,
  userMessage,
  setUserMessage,
  scannedData,
  setScannedData,
  setEditIndex,
  toggleEditModal,
  setScanning,
}) => {
  const [qrReaderKey, setQrReaderKey] = useState(0)
  // const [validScan, setValidScan] = useState(false)

  const validQRCodePattern =
    /^[A-Za-z0-9 ]+\|[A-Za-z0-9 ]+\|[A-Za-z0-9 ]+\|[A-Za-z0-9 ]+$/
  // product | batch | size | quantity

  const handleScan = (data) => {
    console.log(data)
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

    if (validQRCodePattern.test(data)) {
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
        toggleEditModal()
        setEditIndex(scannedData.length)
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

  useEffect(() => {
    updateScannerKey()
  }, [scannedData, setScanning, userMessage])

  return (
    <main className="center">
      <div className={"scanner-window "}>
        <div className="qr-scanner-container">
          <QrReader
            key={qrReaderKey}
            delay={1000}
            constraints={{ video: { facingMode: "environment" } }}
            onError={(error) => handleScanError(error)}
            onScan={(data) => handleScan(data)}
          />
        </div>
      </div>
    </main>
  )
}
