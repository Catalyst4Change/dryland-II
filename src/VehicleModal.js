import React, { useEffect, useState } from "react"
import Modal from "react-modal"

export const VehicleModal = ({ vehicleModalOpen, handleCancel, scanItem }) => {
  // vehicle designator/type | vehicle number/license plate | time | milage

  const [vehicleType, setVehicleType] = useState("")
  const [vehicleMilage, setVehicleMilage] = useState("")
  const [vehicleUseDate, setVehicleUseDate] = useState("")
  const [vehicleDriver, setVehicleDriver] = useState("")

  const updateMilage = (event) => {
    event.preventDefault()
    setVehicleMilage(event.target.value)
  }

  useEffect(() => {
    if (scanItem.length > 0) {
      setVehicleType(scanItem[1].replace("Vehicle: ", ""))
      setVehicleMilage("")
      setVehicleUseDate(scanItem[0].slice(0, 8))

      setVehicleDriver(scanItem[5])
    }
  }, [scanItem])

  return (
    <Modal
      isOpen={vehicleModalOpen}
      onRequestClose={handleCancel}
      contentLabel="Vehicle Info"
    >
      <form className="modal">
        <h2>Check-in Vehicle:</h2>
        <p>Vehicle: {vehicleType}</p>
        <p>Driver: {vehicleDriver}</p>
        <p>Date: {vehicleUseDate}</p>
        <div className="milage-adjust">
          <label htmlFor="milage">
            <p>Enter current milage:</p>
          </label>
          <input
            autoFocus
            type="number"
            name="milage"
            id="milage"
            value={vehicleMilage}
            onChange={(e) => updateMilage(e)}
          />
        </div>
        <button>Cancel</button>
        <button>Done</button>
      </form>
    </Modal>
  )
}
