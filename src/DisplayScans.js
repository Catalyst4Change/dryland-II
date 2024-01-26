import React from "react"

export const DisplayScans = ({ scannedData }) => {
  const handleEdit = (index) => {
    // Implement edit functionality here
    // You can open a modal or form for editing the selected scan
    console.log("Edit scan at index:", index)
  }

  const handleRemove = (index) => {
    // Implement remove functionality here
    // You can remove the selected scan from the scans array
    const updatedScans = [...scans]
    updatedScans.splice(index, 1)
    setScans(updatedScans)
  }

  console.log(scannedData)

  return (
    <div className="center">
      <h3>Scan List</h3>
      {scannedData.map((scan, index) => {
        const readableString = scan.join(" - ") // Create a readable string for the inner array
        return (
          <div className="display-scan-option" key={index}>
            <span>{readableString}</span>
            <div className="display-scan-option-buttons">
              <button className="button" type="button" onClick={handleEdit}>
                Edit
              </button>
              <button className="button" type="button" onClick={handleRemove}>
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
