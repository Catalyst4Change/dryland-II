import React from "react"

export const DisplayScans = ({
  scannedData,
  setEditIndex,
  toggleEditModal,
  handleRemove,
  setCurrentScan,
}) => {
  const handleEdit = (index) => {
    setEditIndex(index)
    setCurrentScan(scannedData[index])
    toggleEditModal()
  }

  return (
    <div className="scan-display center">
      {scannedData.map((scan, index) => {
        const readableString = scan.join(" - ") // Create a readable string for the inner array
        return (
          <div className="display-scan-option" key={index}>
            <span>{readableString}</span>
            <div className="option-buttons">
              <button
                className="button neutral"
                type="button"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="button negative"
                type="button"
                onClick={() => handleRemove(index)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
