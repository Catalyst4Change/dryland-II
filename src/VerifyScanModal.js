import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./App.css"
Modal.setAppElement("#root")

export const VerifyScanModal = ({
  verifyModalOpen,
  setVerifyModalOpen,
  scannedData = [],
  setScannedData,
  setScanning,
}) => {
  const [quantityChange, setQuantityChange] = useState()
  const [timestamp, product, batch, size, quantity, user] = scannedData

  useEffect(() => {
    const isNumber = () => {
      return typeof quantity === "number"
    }
    console.log("isNumber", isNumber())
    if (isNumber()) {
      setQuantityChange(quantity)
    } else {
      setQuantityChange(0)
    }
  }, [quantity])

  const handleQuantityChange = (value) => {
    setQuantityChange(value)
  }

  const stepDown = () => {
    if (quantityChange > 0) {
      handleQuantityChange(quantityChange - 1)
    }
  }
  const stepUp = () => {
    handleQuantityChange(quantityChange + 1)
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
      <form className="modal-form center" onSubmit={handleCloseModal}>
        <h2>Verify Quantity</h2>
        <div className="quantity-adjust">
          <button type="button" className="stepper button" onClick={stepDown}>
            -
          </button>
          <div>
            <p className="quantity-display">{quantityChange}</p>
          </div>
          <button type="button" className="stepper button" onClick={stepUp}>
            +
          </button>
        </div>
        <button className="submit-quantity button" type="submit">
          Done
        </button>
      </form>
    </Modal>
  )
}
