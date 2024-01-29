import React from "react"

export const DisplayScans = ({
  scannedData,
  setScannedData,
  changeEditIndex,
  toggleEditModal,
}) => {
  const handleEdit = (index) => {
    changeEditIndex(index)
    toggleEditModal()
  }

  const handleRemove = (index) => {
    // Implement remove functionality here
    // You can remove the selected scan from the scans array
    const updatedScans = [...scannedData]
    updatedScans.splice(index, 1)
    setScannedData(updatedScans)
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
