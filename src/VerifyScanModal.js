import React, { useEffect, useState } from "react"
import Modal from "react-modal"

export const VerifyScanModal = ({
  verifyModalOpen,
  setVerifyModalOpen,
  scannedData = [],
  setScannedData,
}) => {
  const [timestamp, product, batch, size, quantity, user] = scannedData
  const [quantityChange, setQuantityChange] = useState(quantity)

  const handleQuantityChange = (newValue) => {
    setQuantityChange(newValue)
  }

  const handleCloseModal = () => {
    const updatedScan = [...scannedData]
    updatedScan[4] = quantityChange
    setScannedData(updatedScan)
    setVerifyModalOpen(false)
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
      <button onClick={handleCloseModal}>Close</button>
    </Modal>
  )
}
