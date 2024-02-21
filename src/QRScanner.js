import React, { useEffect, useState, startTransition } from "react"
import { convertTimeStamp } from "./timestampConverter"
import "./App.scss"

const QrReader = React.lazy(() => import("react-qr-scanner"))

export const QRScanner = ({
  user,
  setCurrentScan,
  userMessage,
  setUserMessage,
  scannedData,
  toggleEditModal,
}) => {
  const [qrReaderKey, setQrReaderKey] = useState(0)
  const [scanPressed, setScanPressed] = useState(false)

  const validQRCodePattern =
    /^[A-Za-z0-9 -]+\|[A-Za-z0-9 -]+\|[A-Za-z0-9 -]+\|[A-Za-z0-9 -]+$/ // product | batch | size | quantity

  const handleScan = (data) => {
    if (data) {
      const currentTimeStamp = convertTimeStamp(new Date()) // Assuming data.timestamp needs conversion
      parseScanData(data.text, currentTimeStamp)
      updateScannerKey()
    }
  }

  const handleScanError = (err) => {
    setUserMessage("Scan Error: " + err)
  }

  const parseScanData = (data, timeStamp) => {
    if (validQRCodePattern.test(data)) {
      const parts = data.split("|")
      const [product, batch, bottleSize, quantity] = parts
      const scanItem = [timeStamp, product, batch, bottleSize, quantity, user]

      if (true) {
        //!isDuplicate
        setCurrentScan(scanItem)
        toggleEditModal()
      } else {
        handleScanError("Duplicate scan detected!")
      }
    } else {
      handleScanError("Invalid QR code data format!")
    }
  }

  // Renews scanner key to refresh DOM and avoid scanner quit
  const updateScannerKey = () => {
    setQrReaderKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    updateScannerKey()
  }, [scannedData, userMessage])

  const handleButtonDown = () => {
    startTransition(() => {
      setScanPressed(true)
    })
  }
  const handleButtonUp = () => {
    startTransition(() => {
      setScanPressed(false)
    })
  }

  return (
    <main className="center">
      <div className={"scanner-window "}>
        <div className="qr-scanner-container">
          {scanPressed ? (
            <QrReader
              key={qrReaderKey}
              delay={1000}
              constraints={{ video: { facingMode: "environment" } }}
              onError={handleScanError}
              onScan={handleScan}
            />
          ) : null}
        </div>
      </div>
      <button
        onMouseDown={handleButtonDown}
        onMouseUp={handleButtonUp}
        className="scan-now positive"
      >
        <span>Scan</span>
      </button>
    </main>
  )
}
