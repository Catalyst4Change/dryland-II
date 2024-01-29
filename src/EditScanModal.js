import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./App.scss"
Modal.setAppElement("#root")

export const EditScanModal = ({
  editModalOpen,
  toggleEditModal,
  scannedData,
  editIndex,
  setEditIndex,
  setScannedData,
  setScanning,
}) => {
  const [quantityChange, setQuantityChange] = useState()
  const [timestamp, product, batch, size, quantity, user] =
    scannedData[editIndex] || editIndex !== null
      ? scannedData[editIndex]
      : ["", "", "", "", "", ""]

  useEffect(() => {
    const parsedQuantity = parseInt(quantity)

    if (!isNaN(parsedQuantity)) {
      setQuantityChange(parsedQuantity)
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

  const handleSubmit = (event) => {
    console.log("submitted")
    event.preventDefault()
    const updatedScannedData = [...scannedData]
    updatedScannedData[editIndex][4] = quantityChange
    setScannedData(updatedScannedData)
    toggleEditModal()
    setEditIndex(null)
    setScanning(true)
  }

  const handleCancel = () => {
    toggleEditModal() // Close the modal
    setEditIndex(null) // Reset the edit index
    setScanning(false) // Reset scanning state if needed
  }

  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={onclose}
      contentLabel="Edit Scan"
    >
      <form
        className="modal-form center"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h2>Edit Quantity</h2>
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
        <button className="submit-quantity button positive" type="submit">
          Done
        </button>
      </form>
    </Modal>
  )
}
