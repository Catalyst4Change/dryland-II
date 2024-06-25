import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./App.scss"
Modal.setAppElement("#root")

export const EditScanModal = ({
  editModalOpen,
  toggleEditModal,
  scanItem,
  setScannedData,
  editIndex,
}) => {
  const [quantity, setQuantity] = useState(null)
  const [isVehicle, setIsVehicle] = useState(false)
  const [vehicleType, setVehicleType] = useState("")

  useEffect(() => {
    console.log("scanItem:", scanItem)
    if (scanItem.length > 0) {
      if (scanItem[1].includes("Vehicle")) {
        setIsVehicle(true)
        setVehicleType(scanItem[1].replace("Vehicle: ", ""))
      }
    }

    const parsedQuantity = parseInt(scanItem[4])
    if (!isNaN(parsedQuantity)) {
      setQuantity(parsedQuantity)
    } else {
      setQuantity(0)
    }
  }, [scanItem])

  const updateMilage = (event) => {
    event.preventDefault()
    setQuantity(event.target.value)
  }

  const handleQuantityChange = (value) => {
    setQuantity(value)
  }

  const stepDown = () => {
    if (quantity > 0) {
      handleQuantityChange(quantity - 1)
    }
  }
  const stepUp = () => {
    handleQuantityChange(quantity + 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedItem = [...scanItem]
    updatedItem[4] = quantity // Update the quantity in the item

    if (editIndex !== null && editIndex >= 0) {
      // Update an existing item
      setScannedData((currentScannedData) =>
        currentScannedData.map((item, index) =>
          index === editIndex ? updatedItem : item
        )
      )
    } else {
      // Add a new item
      setScannedData((currentScannedData) => [
        ...currentScannedData,
        updatedItem,
      ])
    }
    toggleEditModal() // Close the modal after submission
    setQuantity(0)
  }

  const handleCancel = () => {
    toggleEditModal() // Just close the modal without saving changes
  }

  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={handleCancel}
      contentLabel="Edit Scan"
    >
      <form className="modal-form center" onSubmit={handleSubmit}>
        {/* 
        create vehicle designator field (t/f) in QR ["Vehicle: Truck"]
        strip out vehicle type on scan
        
        create new locally-stored state: vehicle status
         if vehicle scanned, store check-in info inc. milage
         when vehicle scanned again, calculate use-time (from timestamps), milage
         submit: date - vehicle - plate - use-time - total-milage
        */}

        {isVehicle ? (
          <>
            <h2>Check-in Vehicle:</h2>
            <p>Vehicle: {vehicleType}</p>
            <p>Driver: {scanItem[5]}</p>
            <p>Date: {scanItem[0].slice(0,8)}</p>
            <p>Time: {scanItem[0].slice(-5)}</p>
            <div className="milage-adjust">
              <label htmlFor="milage">
                <p>Enter current milage:</p>
              </label>
              <input
                autoFocus
                type="number"
                name="milage"
                id="milage"
                value={quantity}
                onChange={(e) => updateMilage(e)}
              />
            </div>
          </>
        ) : (
          <>
            <h2>Edit Quantity:</h2>
            <div className="quantity-adjust">
              <button
                type="button"
                className="stepper button positive"
                onClick={stepDown}
              >
                -
              </button>
              <div>
                <p className="quantity-display">{quantity}</p>
              </div>
              <button
                type="button"
                className="stepper button positive"
                onClick={stepUp}
              >
                +
              </button>
            </div>
          </>
        )}

        <div className="modal-options">
          <button
            className="cancel-quantity button negative"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="submit-quantity button positive" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
