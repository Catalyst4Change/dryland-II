import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./App.css"

export const VerifyScanModal = ({
  verifyModalOpen,
  setVerifyModalOpen,
  scannedData = [],
  setScannedData,
  setScanning,
}) => {
  Modal.setAppElement("#root")

  const [timestamp, product, batch, size, quantity, user] = scannedData
  console.log(scannedData)

  const [quantityChange, setQuantityChange] = useState("")

  useEffect(() => {
    setQuantityChange(quantity)
  }, [quantity])

  const handleQuantityChange = (newValue) => {
    setQuantityChange(newValue)
  }

  const handleCloseModal = () => {
    const updatedScan = [...scannedData]
    updatedScan[4] = quantityChange
    setScannedData(updatedScan)
    setVerifyModalOpen(false)
    setScanning(true)
  }

  return (
    <Modal
      isOpen={verifyModalOpen}
      onRequestClose={onclose}
      contentLabel="Verify Scan"
    >
      <h2>Adjust Quantity</h2>
      <div>
        <input
          type="number"
          value={quantityChange}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
        />
      </div>
      <button className="adjust-quantity-button" onClick={handleCloseModal}>
        Close
      </button>
    </Modal>
  )
}
