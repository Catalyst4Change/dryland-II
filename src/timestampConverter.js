// Takes timestamp from QRreader data and converts to readable format
export const convertTimeStamp = (timeStamp) => {
  // Create a new Date object from the timestamp
  const date = new Date(timeStamp)

  // Format the date
  // Get the day, month, year, hours, and minutes
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // +1 because months are 0-indexed
  const year = date.getFullYear().toString().slice(-2) // Get the last two digits of the year
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  // Combine to get the formatted string
  const formattedDate = `${month}/${day}/${year}, ${hours}:${minutes}`

  return formattedDate
  // Outputs the date in DD/MM/YY HH:MM format
}
