import React, { useState } from "react"
import { gapi } from "gapi-script"

export const SendToSheet = ({ allScans }) => {
  const [sheetResponse, setSheetResponse] = useState("")

  const updateSheetResponse = (response) => {
    setSheetResponse(response)
  }

  const sendScansToSheet = () => {
    if (!gapi.client) {
      updateSheetResponse("Google API not loaded!")
      return
    }

    const params = {
      spreadsheetId: "1eOjJmq4Ex8TuBQdFbmeUBcaPWRrKqxXgoNax8GnEspA",
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    }

    const valueRangeBody = {
      values: allScans,
    }

    const request = gapi.client.sheets.spreadsheets.values.append(
      params,
      valueRangeBody
    )
    request.then(
      function (response) {
        updateSheetResponse("Data sent to sheet." + response)
      },
      function (reason) {
        updateSheetResponse(
          "Error sending data to sheet: " + reason.result.error.message
        )
      }
    )
  }

  return (
    <>
      {allScans ? (
        <button type="button" onClick={sendScansToSheet}>
          Submit Scans
        </button>
      ) : (
        ""
      )}
      {sheetResponse ? sheetResponse : ""}
    </>
  )
}
