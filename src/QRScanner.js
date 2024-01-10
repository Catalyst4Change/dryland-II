import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { SendToSheet } from "./SendToSheet";

export const QRScanner = ({ user }) => {
  const [delay] = useState(100);
  const [timeStamp, setTimeStamp] = useState(null);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [scannedBatch, setScannedBatch] = useState(null);
  const [scannedSize, setScannedSize] = useState(null);
  const [scannedQuantity, setScannedQuantity] = useState(null);

  // const [scanComplete, setScanComplete] = useState(false);

  const handleScan = (data) => {
    console.log("scanning");
    if (data) {
      parseScanData(data.text);
      convertTimeStamp(data.timestamp);
      console.log("fullscan", data);
      console.log("scantext", data.text);
    }
  };

  const handleError = (err) => {
    console.error("error", err);
  };

  const convertTimeStamp = (timeStamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timeStamp);

    // Format the date
    // Get the day, month, year, hours, and minutes
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Combine to get the formatted string
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;

    setTimeStamp(formattedDate);
    // Outputs the date in DD/MM/YY HH:MM format
  };

  const parseScanData = (data) => {
    // Assuming a format like "Product|Batch|Bottle Size|Quantity"
    const parts = data.split("|");

    if (parts.length === 4) {
      const [product, batch, bottleSize, quantity] = parts;
      setScannedProduct(product);
      setScannedBatch(batch);
      setScannedSize(bottleSize);
      setScannedQuantity(quantity);
    } else {
      // Handle invalid QR code data format
      console.error("Invalid QR code data format!");
      return null;
    }
  };

  const saveScannedData = () => {
    SendToSheet(
      scannedProduct,
      scannedBatch,
      scannedSize,
      scannedQuantity,
      timeStamp,
      user
    );
  };

  return (
    <main>
      <div className="scanner-window">
        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
      </div>
      <p>
        {scannedProduct},{scannedBatch},{scannedSize},{scannedQuantity},
        {timeStamp},{user}
      </p>
      {scannedProduct && <button onClick={saveScannedData}>SAVE</button>}
    </main>
  );
};

// verify scan data - done!
// fwd to g.sheets api
