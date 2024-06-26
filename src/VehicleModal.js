import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { sendScansToSheet } from "./SendToSheet"
import { convertTimeStamp } from "./timestampConverter"

export const VehicleModal = ({
  vehicleModalOpen,
  handleCancel,
  scanItem,
  closeModals,
  setUserMessage,
}) => {
  // vehicle designator/type | vehicle number/license plate | time | milage

  const [vehicleType, setVehicleType] = useState("")
  const [vehicleIdentifier, setVehicleIdentifier] = useState("")
  const [vehicleMilage, setVehicleMilage] = useState("")
  const [vehicleDriver, setVehicleDriver] = useState("")

  const updateMilage = (event) => {
    event.preventDefault()
    setVehicleMilage(event.target.value)
  }

  const clearData = () => {
    setVehicleType("")
    setVehicleMilage("")
    setVehicleDriver("")
  }

  const cancelVehicleEdit = (event) => {
    event.preventDefault()
    closeModals()
    clearData()
  }

  const submitData = (event) => {
    event.preventDefault()
    queryLocalStorage()
    closeModals()
    clearData()
  }

  const queryLocalStorage = () => {
    const localVehicle = localStorage.getItem("vehicleData")
    if (!localVehicle) {
      // check in - save vehicle data
      const checkoutTime = Date.now()
      const checkoutData = {
        checkoutTime,
        checkoutType: vehicleType,
        vehicleIdentifier,
        checkoutMilage: vehicleMilage,
        checkoutDriver: vehicleDriver,
      }

      localStorage.setItem("vehicleData", JSON.stringify(checkoutData))
    } else {
      const parsedLocalVehicle = JSON.parse(localVehicle)
      // math milage and time
      const {
        checkoutTime,
        checkoutType,
        vehicleIdentifier,
        checkoutMilage,
        checkoutDriver,
      } = parsedLocalVehicle

      if (parsedLocalVehicle.vehicleIdentifier != vehicleIdentifier) {
        setUserMessage(
          "Please check out of the previous vehicle before checking in a new one!"
        )
        return
      }

      const checkInTime = Date.now()
      const elapsedTime = checkInTime - checkoutTime
      const checkInMilage = vehicleMilage
      const elapsedMilage = checkInMilage - checkoutMilage

      // format data
      const vehicleReturnData = {
        checkoutType,
        vehicleIdentifier,
        checkoutTime: convertTimeStamp(checkoutTime),
        checkInTime: convertTimeStamp(checkInTime),
        elapsedTime: formatElapsedTime(elapsedTime),
        checkoutMilage,
        checkInMilage,
        elapsedMilage,
        checkoutDriver,
      }
      // submit directly to G sheets (page 2)
      console.log("vehicleReturnData:", vehicleReturnData)
      sendScansToSheet(vehicleReturnData, setUserMessage, 2)
      localStorage.removeItem("vehicleData")
    }
  }

  const formatElapsedTime = (elapsedTime) => {
    // Calculate hours, minutes, and seconds
    const totalSeconds = Math.floor(elapsedTime / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    // Format hours, minutes, and seconds with leading zeros if needed
    const formattedHours = String(hours).padStart(2, "0")
    const formattedMinutes = String(minutes).padStart(2, "0")

    return `${formattedHours}:${formattedMinutes}`
  }

  useEffect(() => {
    if (scanItem.length > 0) {
      setVehicleType(scanItem[2])
      setVehicleIdentifier(scanItem[3])
      setVehicleDriver(scanItem[5])
      setVehicleMilage("")
    }
  }, [scanItem])

  return (
    <Modal
      isOpen={vehicleModalOpen}
      onRequestClose={handleCancel}
      contentLabel="Vehicle Info"
    >
      <form className="modal" onSubmit={(e) => submitData(e)}>
        <h2>Check-in Vehicle:</h2>
        <p>Vehicle: {vehicleType}</p>
        <p>Identifier: {vehicleIdentifier}</p>
        <p>Driver: {vehicleDriver}</p>
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
        <button className="negative" onClick={(e) => cancelVehicleEdit(e)}>
          Cancel
        </button>
        <button type="submit" className="positive">
          Done
        </button>
      </form>
    </Modal>
  )
}
