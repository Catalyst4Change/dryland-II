import React from "react"
import { gapi } from "gapi-script"
import "./App.scss"

export const SendToSheet = ({
  scannedData,
  setUserMessage,
  clearScannedData,
}) => {
  const sendScansToSheet = () => {
    if (!gapi.client) {
      setUserMessage("Google API not loaded!")
      return
    }

    const params = {
      spreadsheetId: "1eOjJmq4Ex8TuBQdFbmeUBcaPWRrKqxXgoNax8GnEspA",
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    }

    const valueRangeBody = {
      values: scannedData,
    }

    const request = gapi.client.sheets.spreadsheets.values.append(
      params,
      valueRangeBody
    )
    request.then(
      function (response) {
        setUserMessage("Data sent successfully!")
        clearScannedData()
      },
      function (reason) {
        setUserMessage(
          "Error sending data to sheet: " + reason.result.error.message
        )
      }
    )
  }

  return (
    <div className="send-to-sheet">
      {scannedData.length > 0 ? (
        <button
          className="button positive"
          type="button"
          onClick={sendScansToSheet}
        >
          Submit Scans
        </button>
      ) : null}
    </div>
  )
}
