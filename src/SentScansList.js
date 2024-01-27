import React from "react"

export const SentScansList = ({ sentScans }) => {
  return (
    <div className="scan-display center">
      {sentScans.length > 0 ? (
        <span>
          <b>Previously sent scans:</b>
        </span>
      ) : null}
      {sentScans.map((scan, index) => {
        const readableString = scan.join(" - ") // Create a readable string for the inner array
        return (
          <div className="display-scan-option" key={index}>
            <span>{readableString}</span>
          </div>
        )
      })}
    </div>
  )
}
