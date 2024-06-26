import { gapi } from "gapi-script"

export const sendScansToSheet = ( scannedData, setUserMessage,  sheetNumber) => {

  if (!gapi.client) {
    setUserMessage("Google API not loaded!")
    return
  }

  const params = {
    spreadsheetId: "1eOjJmq4Ex8TuBQdFbmeUBcaPWRrKqxXgoNax8GnEspA",
    range: `Sheet${sheetNumber}`,
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
    },
    function (reason) {
      setUserMessage(
        "Error sending data to sheet: " + reason.result.error.message
      )
    }
  )
}
