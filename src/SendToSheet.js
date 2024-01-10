import { gapi } from "gapi-script";

export const SendToSheet = (
  product,
  batch,
  bottleSize,
  quantity,
  timeStamp,
  user
) => {
  const appendDataToSheet = () => {
    if (!gapi.client) {
      console.error("Google API not loaded!");
      return;
    }

    const params = {
      spreadsheetId: "1iMdJeg9hhvP8pKldf01Ymfpw77QPMDqo-6T6IJTgbQg",
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
    };

    const valueRangeBody = {
      values: [[timeStamp, product, batch, bottleSize, quantity, user]],
    };

    const request = gapi.client.sheets.spreadsheets.values.append(
      params,
      valueRangeBody
    );
    request.then(
      function (response) {
        console.log("Data sent to sheet.", response);
      },
      function (reason) {
        console.error(
          "Error sending data to sheet ",
          reason.result.error.message
        );
      }
    );
  };
  appendDataToSheet();
};
